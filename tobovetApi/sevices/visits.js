const db = require("./db");
const { checkNullish } = require("../utils/checkNullish");
const { dateToSQLFormat } = require("../utils/dateToSQLFormat");

// ------------------------------------------------------------ GETS
async function getVisits() {
  const data = await db.query(
    `SELECT * FROM visits v 
    INNER JOIN pets p ON v.visit_pet = p.pet_id
    INNER JOIN clients c ON p.pet_owner = c.client_id
    INNER JOIN sys_users u ON v.visit_vet = u.user_id
    LEFT JOIN vaccinations va ON v.visit_id=va.vaccination_visit_applied
    LEFT JOIN articles a ON va.vaccination_article=a.article_id
    ORDER BY DATE(visit_date) DESC
    `
  );
  const result = [];
  data.forEach((row) => {
    currVisitIdx = result.findIndex((visit) => visit.id === row.visit_id);
    if (currVisitIdx === -1) {
      result.push({
        id: row.visit_id,
        clientId: row.client_id,
        client: row.client_name,
        petId: row.pet_id,
        pet: row.pet_name,
        vetId: row.user_id,
        vet: row.user_name,
        date: row.visit_date,
        species: row.pet_species,
        breed: row.pet_breed,
        chip: row.pet_chip,
        visitReason: row.visit_actions,
        observations: row.visit_anam,
        weight: row.visit_weight,
        condition: row.visit_condition,
        temperature: row.visit_temperatire,
        symptoms: row.visit_symptoms,
        tests: row.visit_tests,
        diagnostics: row.visit_diagnostics,
        testDiagnostics: row.visit_tests_diagnostics,
        treatment: row.visit_treatment,
        vaccines: row.vaccination_article
          ? [
              {
                id: row.vaccination_article,
                name: row.article_name,
                validity: row.vaccination_validity_period,
              },
            ]
          : [],
        deworm: row.visit_deworm,
        recommendations: row.visit_recommendations,
        completed: row.visit_completed,
      });
    } else if (row.vaccination_article) {
      result[currVisitIdx].vaccines.push({
        id: row.vaccination_article,
        name: row.article_name,
        validity: row.vaccination_validity_period,
      });
    }
  });
  return result;
}

async function getVisitsById(id) {
  let query = {
    sql: "SELECT * FROM visits WHERE visit_id=?",
    params: [checkNullish(id)],
  };
  const data = await db.query(query.sql, query.params);

  return {
    data,
  };
}

async function getVisitsByClient(client) {
  let query = {
    sql: "SELECT * FROM visits WHERE visit_client=?",
    params: [checkNullish(client)],
  };
  const data = await db.query(query.sql, query.params);

  return {
    data,
  };
}

async function getVisitsByPet(pet) {
  let query = {
    sql: `SELECT * FROM visits v
    LEFT JOIN vaccinations va ON v.visit_id=va.vaccination_visit_applied
    LEFT JOIN articles a ON va.vaccination_article=a.article_id
    WHERE visit_pet=?`,
    params: [checkNullish(pet)],
  };
  const data = await db.query(query.sql, query.params);

  const result = [];
  data.forEach((row) => {
    currVisitIdx = result.findIndex((visit) => visit.id === row.visit_id);
    if (currVisitIdx === -1) {
      result.push({
        id: row.visit_id,
        vetId: row.visit_vet,
        date: row.visit_date,
        visitReason: row.visit_actions,
        observations: row.visit_anam,
        weight: row.visit_weight,
        condition: row.visit_condition,
        temperature: row.visit_temperature,
        symptoms: row.visit_symptoms,
        tests: row.visit_tests,
        diagnostics: row.visit_diagnostics,
        testDiagnostics: row.visit_tests_diagnostics,
        treatment: row.visit_treatment,
        vaccines: row.vaccination_article
          ? [
              {
                id: row.vaccination_article,
                name: row.article_name,
                validity: row.vaccination_validity_period,
              },
            ]
          : [],
        deworm: row.visit_deworm,
        recommendations: row.visit_recommendations,
        completed: row.visit_completed,
      });
    } else if (row.vaccination_article) {
      result[currVisitIdx].vaccines.push({
        id: row.vaccination_article,
        name: row.article_name,
        validity: row.vaccination_validity_period,
      });
    }
  });
  return result;
}

async function getVisitsByVet(vet) {
  let query = {
    sql: "SELECT * FROM visits WHERE visit_vet=?",
    params: [checkNullish(vet)],
  };
  const data = await db.query(query.sql, query.params);

  return {
    data,
  };
}

async function getVisitsAndPets() {
  const data = await db.query(
    `SELECT * FROM visits v INNER JOIN pets p ON v.visit_pet = p.pet_id`
  );

  return {
    data,
  };
}

async function getVisitsAndClients() {
  const data = await db.query(
    `SELECT * FROM visits v INNER JOIN clients c ON v.visit_client = c.client_id`
  );

  return {
    data,
  };
}

// GET for home screen
async function getVisitsHistorical() {
  const data = await db.query(
    `SELECT * FROM visits v 
    INNER JOIN pets p ON v.visit_pet = p.pet_id
    INNER JOIN clients c ON p.pet_owner = c.client_id
    INNER JOIN sys_users u ON v.visit_vet = u.user_id
    LEFT JOIN vaccinations va ON v.visit_id=va.vaccination_visit_applied
    LEFT JOIN articles a ON va.vaccination_article=a.article_id
    WHERE (visit_completed = 1)
    OR (DATE(visit_date) < CURDATE())
    ORDER BY DATE(visit_date) DESC
    `
  );
  const result = [];
  data.forEach((row) => {
    currVisitIdx = result.findIndex((visit) => visit.id === row.visit_id);
    if (currVisitIdx === -1) {
      result.push({
        id: row.visit_id,
        clientId: row.client_id,
        client: row.client_name,
        petId: row.pet_id,
        pet: row.pet_name,
        vetId: row.user_id,
        vet: row.user_name,
        date: row.visit_date,
        species: row.pet_species,
        breed: row.pet_breed,
        chip: row.pet_chip,
        visitReason: row.visit_actions,
        observations: row.visit_anam,
        weight: row.visit_weight,
        condition: row.visit_condition,
        temperature: row.visit_temperatire,
        symptoms: row.visit_symptoms,
        tests: row.visit_tests,
        diagnostics: row.visit_diagnostics,
        testDiagnostics: row.visit_tests_diagnostics,
        treatment: row.visit_treatment,
        vaccines: row.vaccination_article
          ? [
              {
                id: row.vaccination_article,
                name: row.article_name,
                validity: row.vaccination_validity_period,
              },
            ]
          : [],
        deworm: row.visit_deworm,
        recommendations: row.visit_recommendations,
        completed: row.visit_completed,
      });
    } else if (row.vaccination_article) {
      result[currVisitIdx].vaccines.push({
        id: row.vaccination_article,
        name: row.article_name,
        validity: row.vaccination_validity_period,
      });
    }
  });
  return result;
}

async function getVisitsToday() {
  const data = await db.query(
    `SELECT * FROM visits v 
    INNER JOIN pets p ON v.visit_pet = p.pet_id
    INNER JOIN clients c ON p.pet_owner = c.client_id
    INNER JOIN sys_users u ON v.visit_vet = u.user_id
    LEFT JOIN vaccinations va ON v.visit_id=va.vaccination_visit_applied
    LEFT JOIN articles a ON va.vaccination_article=a.article_id
    WHERE DATE(visit_date) = CURDATE()
    AND visit_completed = 0
    ORDER BY DATE(visit_date) ASC`
  );
  const result = [];
  data.forEach((row) => {
    currVisitIdx = result.findIndex((visit) => visit.id === row.visit_id);
    if (currVisitIdx === -1) {
      result.push({
        id: row.visit_id,
        clientId: row.client_id,
        client: row.client_name,
        petId: row.pet_id,
        pet: row.pet_name,
        vetId: row.user_id,
        vet: row.user_name,
        date: row.visit_date,
        species: row.pet_species,
        breed: row.pet_breed,
        chip: row.pet_chip,
        visitReason: row.visit_actions,
        observations: row.visit_anam,
        weight: row.visit_weight,
        condition: row.visit_condition,
        temperature: row.visit_temperatire,
        symptoms: row.visit_symptoms,
        tests: row.visit_tests,
        diagnostics: row.visit_diagnostics,
        testDiagnostics: row.visit_tests_diagnostics,
        treatment: row.visit_treatment,
        vaccines: row.vaccination_article
          ? [
              {
                id: row.vaccination_article,
                name: row.article_name,
                validity: row.vaccination_validity_period,
              },
            ]
          : [],
        deworm: row.visit_deworm,
        recommendations: row.visit_recommendations,
        completed: row.visit_completed,
      });
    } else if (row.vaccination_article) {
      result[currVisitIdx].vaccines.push({
        id: row.vaccination_article,
        name: row.article_name,
        validity: row.vaccination_validity_period,
      });
    }
  });
  return result;
}

async function getVisitsFuture() {
  const data = await db.query(
    `SELECT * FROM visits v 
    INNER JOIN pets p ON v.visit_pet = p.pet_id
    INNER JOIN clients c ON p.pet_owner = c.client_id
    INNER JOIN sys_users u ON v.visit_vet = u.user_id
    LEFT JOIN vaccinations va ON v.visit_id=va.vaccination_visit_applied
    LEFT JOIN articles a ON va.vaccination_article=a.article_id
    WHERE DATE(visit_date) > CURDATE()
    AND visit_completed = 0
    ORDER BY DATE(visit_date) ASC
    `
  );
  const result = [];
  data.forEach((row) => {
    currVisitIdx = result.findIndex((visit) => visit.id === row.visit_id);
    if (currVisitIdx === -1) {
      result.push({
        id: row.visit_id,
        clientId: row.client_id,
        client: row.client_name,
        petId: row.pet_id,
        pet: row.pet_name,
        vetId: row.user_id,
        vet: row.user_name,
        date: row.visit_date,
        species: row.pet_species,
        breed: row.pet_breed,
        chip: row.pet_chip,
        visitReason: row.visit_actions,
        observations: row.visit_anam,
        weight: row.visit_weight,
        condition: row.visit_condition,
        temperature: row.visit_temperatire,
        symptoms: row.visit_symptoms,
        tests: row.visit_tests,
        diagnostics: row.visit_diagnostics,
        testDiagnostics: row.visit_tests_diagnostics,
        treatment: row.visit_treatment,
        vaccines: row.vaccination_article
          ? [
              {
                id: row.vaccination_article,
                name: row.article_name,
                validity: row.vaccination_validity_period,
              },
            ]
          : [],
        deworm: row.visit_deworm,
        recommendations: row.visit_recommendations,
        completed: row.visit_completed,
      });
    } else if (row.vaccination_article) {
      result[currVisitIdx].vaccines.push({
        id: row.vaccination_article,
        name: row.article_name,
        validity: row.vaccination_validity_period,
      });
    }
  });
  return result;
}

async function getVisitsExtended() {
  const data = await db.query(
    `SELECT * FROM visits v INNER JOIN pets p ON v.visit_pet = p.pet_id 
    INNER JOIN clients c ON p.pet_owner = c.client_id 
    INNER JOIN sys_users u ON v.visit_vet = u.user_id`
  );

  return {
    data,
  };
}

// ------------------------------------------------------------ CREATES
async function createVisit(visit) {
  let query = {
    sql: `INSERT INTO visits (visit_client, visit_pet, visit_date, visit_vet, visit_actions, visit_completed) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    params: [
      checkNullish(visit.clientId),
      checkNullish(visit.petId),
      checkNullish(dateToSQLFormat(visit.date)),
      checkNullish(visit.vetId),
      checkNullish(visit.visitReason),
      checkNullish(visit.completed),
    ],
  };

  const result = await db.query(query.sql, query.params);

  if (result?.affectedRows) {
    message = "Visit created successfully";
    return { message };
  }
  throw new Error();
}

// ------------------------------------------------------------ UPDATES
async function updateVisit(visit) {
  let visitVaccines = await db.query(
    `SELECT *
    FROM vaccinations
    WHERE vaccination_visit_applied=${visit.id}
    AND vaccination_pet=${visit.petId}`
  );

  const queries = [];
  queries.push({
    sql: `UPDATE visits 
    SET visit_date=?, visit_vet=?, visit_actions=?, visit_weight=?, visit_condition=?, visit_temperature=?, 
    visit_anam=?, visit_symptoms=?, visit_tests=?, visit_diagnostics=?, visit_tests_diagnostics=?, visit_treatment=?, 
    visit_deworm=?, visit_recommendations=?, visit_completed=? 
    WHERE visit_id=?`,
    params: [
      checkNullish(dateToSQLFormat(visit.date)),
      checkNullish(visit.vetId),
      checkNullish(visit.visitReason),
      checkNullish(visit.weight),
      checkNullish(visit.condition),
      checkNullish(visit.temperature),
      checkNullish(visit.observations),
      checkNullish(visit.symptoms),
      checkNullish(visit.tests),
      checkNullish(visit.diagnostics),
      checkNullish(visit.testDiagnostics),
      checkNullish(visit.treatment),
      checkNullish(visit.deworm),
      checkNullish(visit.recommendations),
      checkNullish(visit.completed),
      checkNullish(visit.id),
    ],
  });

  if (visit.vaccines) {
    visit.vaccines.forEach(({ id, validity }) => {
      const vaccinationEntry = visitVaccines.find(
        ({ vaccination_article }) => vaccination_article === id
      );
      if (vaccinationEntry) {
        queries.push({
          sql: `UPDATE vaccinations SET vaccination_validity_period=?, vaccination_date=? 
          WHERE vaccination_id=?`,
          params: [
            checkNullish(validity),
            checkNullish(dateToSQLFormat(visit.date)),
            vaccinationEntry.vaccination_id,
          ],
        });
        visitVaccines = visitVaccines.filter(
          ({ vaccination_article }) => vaccination_article !== id
        );
      } else {
        queries.push({
          sql: `INSERT INTO vaccinations (vaccination_article, vaccination_pet, 
            vaccination_visit_applied, vaccination_validity_period, vaccination_date) 
            VALUES (?, ?, ?, ?, ?)`,
          params: [
            id,
            checkNullish(visit.petId),
            checkNullish(visit.id),
            checkNullish(validity),
            checkNullish(dateToSQLFormat(visit.date)),
          ],
        });
      }
    });
    visitVaccines.forEach(({ vaccination_id }) =>
      queries.push({
        sql: `DELETE FROM vaccinations 
        WHERE vaccination_id=?`,
        params: [vaccination_id],
      })
    );
  }

  const result = await db.safeQuery(queries);

  console.log("updateVisit result", result);
  let message = "Error in updating visit";

  if (result.affectedRows) {
    message = "Visit updated successfully";
  }

  return { message };
}

async function completeVisit(id) {
  let query = {
    sql: "UPDATE visits SET visit_completed=1 WHERE visit_id=?",
    params: [checkNullish(id)],
  };
  const result = await db.query(query.sql, query.params);

  let message = "Error in completing visit";

  if (result.affectedRows) {
    message = "Visit completed successfully";
  }

  return { message };
}

// ------------------------------------------------------------ DELETES
async function deleteVisit(id) {
  const queries = [];
  queries.push({
    sql: "DELETE FROM vaccinations WHERE vaccination_visit_applied=?",
    params: [checkNullish(id)],
  });
  queries.push({
    sql: "UPDATE vaccinations SET vaccination_visit_planned=NULL WHERE vaccination_visit_planned=?",
    params: [checkNullish(id)],
  });
  queries.push({
    sql: "DELETE FROM visits WHERE visit_id=?",
    params: [checkNullish(id)],
  });
  const result = await db.safeQuery(queries);

  let message = "Error in deleting visit";

  if (result.affectedRows) {
    message = "Visit deleted successfully";
  }

  return { message };
}

module.exports = {
  getVisits,
  getVisitsById,
  getVisitsByClient,
  getVisitsByPet,
  getVisitsByVet,
  getVisitsAndPets,
  getVisitsAndClients,
  getVisitsHistorical,
  getVisitsToday,
  getVisitsFuture,
  getVisitsExtended,
  createVisit,
  updateVisit,
  completeVisit,
  deleteVisit,
};
