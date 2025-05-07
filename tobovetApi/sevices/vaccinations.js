const db = require("./db");
const { checkNullish } = require("../utils/checkNullish");
const { dateToSQLFormat } = require("../utils/dateToSQLFormat");

async function getVaccinations() {
  //Where the v.visit_date + a.article_validity_period < thirty days from now
  const data = await db.query(
    `SELECT vac.vaccination_id, vac.vaccination_article, a.article_id, a.article_name, 
      vac.vaccination_pet, p.pet_id, p.pet_name, p.pet_owner, c.client_id, c.client_name, 
      vac.vaccination_validity_period, a.article_validity_period,
      vac.vaccination_visit_applied, v.visit_actions, v.visit_date as vaccination_date,
      vac.vaccination_date as vaccination_date_dup, vac.vaccination_visit_planned,
      DATE_ADD(v.visit_date, INTERVAL vac.vaccination_validity_period DAY) AS next_expiration_date
      FROM vaccinations vac
        JOIN pets p ON p.pet_id = vac.vaccination_pet
          JOIN clients c ON c.client_id = p.pet_owner
          JOIN articles a ON a.article_id = vac.vaccination_article
          LEFT JOIN visits v ON vac.vaccination_visit_applied = v.visit_id
      WHERE vac.vaccination_visit_planned IS NULL 
      AND DATEDIFF(DATE_ADD(v.visit_date, INTERVAL vac.vaccination_validity_period DAY), CURDATE()) < 30
      AND v.visit_completed = 1
      ORDER BY vac.vaccination_date DESC`
  );

  return data.map((row) => ({
    id: row.vaccination_id,
    articleId: row.article_id,
    article: row.article_name,
    petId: row.pet_id,
    petName: row.pet_name,
    clientId: row.client_id,
    clientName: row.client_name,
    applliedVisitId: row.vaccination_visit_applied,
    validity: row.article_validity_period,
    vaccinationDate: row.vaccination_date,
    nextExpirationDate: row.next_expiration_date,
  }));
}

async function getVaccinationsByPet(petId) {
  const data = await db.query(
    `SELECT vac.vaccination_id, vac.vaccination_article, a.article_id, a.article_name,
      vac.vaccination_pet, p.pet_id, p.pet_name, p.pet_owner, c.client_id, c.client_name,
      vac.vaccination_validity_period, a.article_validity_period,
      vac.vaccination_visit_applied, v.visit_actions, v.visit_date as vaccination_date,
      vac.vaccination_date as vaccination_date_dup, vac.vaccination_visit_planned,
      DATE_ADD(v.visit_date, INTERVAL a.article_validity_period DAY) AS next_expiration_date
      FROM vaccinations vac
        JOIN pets p ON p.pet_id = vac.vaccination_pet
          JOIN clients c ON c.client_id = p.pet_owner
          JOIN articles a ON a.article_id = vac.vaccination_article
          LEFT JOIN visits v ON vac.vaccination_visit_applied = v.visit_id
      WHERE vac.vaccination_pet = ?
      ORDER BY vac.vaccination_date DESC`,
    [checkNullish(petId)]
  );

  return data.map((row) => ({
    id: row.vaccination_id,
    articleId: row.article_id,
    article: row.article_name,
    petId: row.pet_id,
    petName: row.pet_name,
    clientId: row.client_id,
    clientName: row.client_name,
    applliedVisitId: row.vaccination_visit_applied,
    validity: row.article_validity_period,
    vaccinationDate: row.vaccination_date,
    nextExpirationDate: row.next_expiration_date,
  }));
}



// ------------------------------------------------------------ POST

async function createSecondVisit(vaccinationVisit) {
  //Me llega una visita con una lista de vacunas para actualizar la visita y las vacunas
  let message = "Error in creating vaccination visit";
  let vaccineList = vaccinationVisit.vaccines;
  try {
    const queries = [];

    if (vaccinationVisit == null) {
      return { message };
    }

    // Inserto la nueva visita que es "hay que vacunar al bicho"
    let insertVisitQuery = {
      sql: `INSERT INTO visits (visit_client, visit_pet, visit_date, visit_vet, visit_actions, 
        visit_completed)
        VALUES (?, ?, ?, ?, ?, ?)`,
      params: [
        checkNullish(vaccinationVisit.clientId),
        checkNullish(vaccinationVisit.petId),
        checkNullish(dateToSQLFormat(vaccinationVisit.date)),
        checkNullish(vaccinationVisit.vetId),
        checkNullish(vaccinationVisit.visitReason),
        checkNullish(vaccinationVisit.completed),
      ],
    };

    const { insertId } = await db.query(
      insertVisitQuery.sql,
      insertVisitQuery.params
    );

    //Por cada vacuna
    vaccineList.forEach(async ({ id, articleId, validity }, index) => {
      queries.push({
        sql: `UPDATE vaccinations SET vaccination_visit_planned= ? WHERE vaccination_id = ?`,
        params: [insertId, id],
      });

      //Create a new vaccination visit
      queries.push({
        sql: `INSERT INTO vaccinations (vaccination_article, vaccination_pet, vaccination_validity_period, vaccination_visit_applied, vaccination_date)
            VALUES (?, ?, ?, ?, ?)`,
        params: [
          checkNullish(articleId),
          checkNullish(vaccinationVisit.petId),
          checkNullish(validity),
          checkNullish(insertId),
          checkNullish(dateToSQLFormat(vaccinationVisit.date)),
        ],
      });
    });
    // Execute the queries
    const result = await db.safeQuery(queries);
    if (result.length) message = "Vaccination visit created successfully";
  } catch (err) {
    console.error(err);
    return { message };
  }
  return { message };
}

async function createVaccination(vaccination) {
  let query = {
    sql: `INSERT INTO vaccinations 
    (vaccination_article, vaccination_pet, vaccination_validity_period, vaccination_visit_applied, vaccination_visit_planned, vaccination_date)
    VALUES (?, ?, ?, ?, ?, ?)`,
    params: [
      checkNullish(vaccination.article),
      checkNullish(vaccination.pet),
      checkNullish(vaccination.validityPeriod),
      checkNullish(vaccination.visitApplied),
      checkNullish(vaccination.visitPlanned),
      checkNullish(vaccination.date),
    ],
  };
  const result = await db.query(query.sql, query.params);
  return result;
}

// ------------------------------------------------------------ PUT

async function updateVaccinationVisit(vaccinationVisit) {
  let message = "Error in updating vaccination visit";
  try {
    const queries = [];

    if (vaccinationVisit == null) {
      return { message };
    }

    // Update visit first
    queries.push({
      sql: `UPDATE visits SET 
      visit_client=?, visit_pet=?, visit_vet=?, visit_date=?, visit_actions=?, visit_weight=?, visit_condition=?, visit_temperature=?, 
      visit_anam=?, visit_symptoms=?, visit_test=?, visit_diagnostics=?, visit_test_diagnostics=?, visit_treatment=?, visit_deworm=?, visit_recommendations=?, visit_completed=?
      WHERE visit_id=?`,
      params: [
        checkNullish(vaccinationVisit.client),
        checkNullish(vaccinationVisit.pet),
        checkNullish(vaccinationVisit.vet),
        checkNullish(vaccinationVisit.date),
        checkNullish(vaccinationVisit.actions),
        checkNullish(vaccinationVisit.weight),
        checkNullish(vaccinationVisit.condition),
        checkNullish(vaccinationVisit.temperature),
        checkNullish(vaccinationVisit.anam),
        checkNullish(vaccinationVisit.symptoms),
        checkNullish(vaccinationVisit.test),
        checkNullish(vaccinationVisit.diagnostics),
        checkNullish(vaccinationVisit.testDiagnostics),
        checkNullish(vaccinationVisit.treatment),
        checkNullish(vaccinationVisit.deworm),
        checkNullish(vaccinationVisit.recommendations),
        checkNullish(vaccinationVisit.completed),
        checkNullish(vaccinationVisit.id),
      ],
    });

    // Update the vaccination with the visit id
    //Case 1: The pet has a previous vaccination visit but no vaccination visit planned -> Create a new vaccination visit and update the previous one
    //Case 2: The pet has a previous vaccination visit and a vaccination visit planned -> Update the previous vaccination visit and create a new one
    //Case 3: The pet has no previous vaccination visit -> Create a new vaccination visit

    //Case 1
  } catch (err) {
    console.error(err);
  }
  return { message };
}

async function updateVaccination(vaccination) {
  let query = {
    sql: `UPDATE vaccinations SET 
    vaccination_article=?, vaccination_pet=?, vaccination_validity_period=?, vaccination_visit_applied=?, vaccination_visit_planned=?, vaccination_date=?
    WHERE vaccination_id=?`,
    params: [
      checkNullish(vaccination.article),
      checkNullish(vaccination.pet),
      checkNullish(vaccination.validityPeriod),
      checkNullish(vaccination.visitApplied),
      checkNullish(vaccination.visitPlanned),
      checkNullish(vaccination.date),
      checkNullish(vaccination.id),
    ],
  };
  const result = await db.query(query.sql, query.params);
  return result;
}

// ------------------------------------------------------------ DELETE
async function deleteVaccination(id) {
  let query = {
    sql: "DELETE FROM vaccinations WHERE vaccination_id=?",
    params: [checkNullish(id)],
  };
  const data = await db.query(query.sql, query.params);
  return data;
}

module.exports = {
  getVaccinations,
  getVaccinationsByPet,
  createVaccination,
  createSecondVisit,
  updateVaccination,
  deleteVaccination,
};
