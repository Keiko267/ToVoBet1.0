const db = require("./db");
const { checkNullish } = require("../utils/checkNullish");

// ------------------------------------------------------------ GETS

/**
 * @param {Object} arrayConditions  -- Object with the conditions to filter the query
 *                                  -- id: number
 *                                  -- actives: true/false
 *                                  -- owner: number
 * @returns {Object}                -- Object with the data from the query
 */

async function getPets(arrayConditions = {}) {
  let query = `SELECT * FROM pets`;
  const conditions = [];

  if (arrayConditions.hasOwnProperty("id")) {
    conditions.push(`pet_id = ${arrayConditions["id"]}`);
  }

  if (arrayConditions.hasOwnProperty("actives")) {
    if (arrayConditions["actives"] === "true") {
      conditions.push("pet_status = 1");
    } else {
      conditions.push("pet_status = 0");
    }
  }

  if (arrayConditions.hasOwnProperty("owner")) {
    conditions.push(`pet_owner = ${arrayConditions["owner"]}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  const data = await db.query(query);

  return {
    data,
  };
}

async function getPetById(id) {
  let query = {
    sql: "SELECT * FROM pets WHERE pet_id=?",
    params: [checkNullish(id)],
  };
  const data = await db.query(query.sql, query.params);

  return {
    data,
  };
}

async function getPetByOwner(owner) {
  let query = {
    sql: "SELECT * FROM pets WHERE pet_owner=?",
    params: [checkNullish(owner)],
  };
  const data = await db.query(query.sql, query.params);

  return {
    data,
  };
}

async function getPetsTable(arrayConditions = {}) {
  let query = `SELECT * FROM clients c INNER JOIN pets p ON p.pet_owner = c.client_id 
        INNER JOIN client_contacts cc ON c.client_id = cc.client_id`;
  const conditions = [];

  if (arrayConditions.hasOwnProperty("id")) {
    conditions.push(`p.pet_id = ${arrayConditions["id"]}`);
  }
  if (arrayConditions.hasOwnProperty("owner")) {
    conditions.push(`p.pet_owner = ${arrayConditions["owner"]}`);
  }
  if (arrayConditions.hasOwnProperty("actives")) {
    if (arrayConditions["actives"] === "true") {
      conditions.push("p.pet_status = 1");
    } else {
      conditions.push("p.pet_status = 0");
    }
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  const data = await db.query(query);
  const result = [];
  data.forEach(
    ({
      client_id,
      client_name,
      client_document,
      client_status,
      client_dir,
      client_city,
      client_cp,
      client_prov,
      client_observations,
      pet_id,
      pet_name,
      pet_status,
      pet_chip,
      pet_sex,
      pet_birthdate,
      pet_species,
      pet_breed,
      pet_sterilized,
      pet_vet,
      pet_observations,
      pet_clinical_observations,
      client_contact_id,
      client_contact_name,
      client_contact_tlf,
      client_contact_email,
    }) => {
      if (!result.find((row) => row.id === client_id))
        result.push({
          id: client_id,
          name: client_name,
          document: client_document,
          status: client_status,
          direction: client_dir,
          city: client_city,
          postcode: client_cp,
          province: client_prov,
          observations: client_observations,
          pets: [],
          contacts: [],
        });
      else {
        if (!result.find((row) => row.petId === pet_id))
          result[result.findIndex((row) => row.id === client_id)].pets.push({
            id: pet_id,
            name: pet_name,
            status: pet_status,
            chip: pet_chip,
            sex: pet_sex,
            birthdate: pet_birthdate,
            species: pet_species,
            breed: pet_breed,
            sterilized: pet_sterilized,
            vet: pet_vet,
            observations: pet_observations,
            clinicalObservations: pet_clinical_observations,
          });
        if (!result.find((row) => row.contactId === client_contact_id))
          result[result.findIndex((row) => row.id === client_id)].contacts.push(
            {
              id: client_contact_id,
              name: client_contact_name,
              phone: client_contact_tlf,
              email: client_contact_email,
            }
          );
      }
    }
  );
  return result;
}

async function getSpeciesGroups() {
  const data = await db.query(
    `SELECT DISTINCT pet_species
        FROM pets ORDER BY pet_species`
  );

  return data.map((row) => row.pet_species);
}

async function getBreedsGroups() {
  const data = await db.query(
    `SELECT DISTINCT pet_breed
        FROM pets ORDER BY pet_breed`
  );
  return data.map((row) => row.pet_breed);
}

async function getPetConsumptionHistory(pet_id) {
  let query = {
    sql: "SELECT * FROM pets p INNER JOIN visits v ON p.pet_id = v.visit_pet WHERE p.pet_id=?",
    params: [checkNullish(pet_id)],
  };

  const data = await db.query(query.sql, query.params);
  const result = [];
  data.forEach(
    ({
      pet_id,
      pet_name,
      visit_id,
      visit_vet,
      visit_date,
      visit_diagnostics,
      visit_treatment,
      visit_recommendations,
    }) => {
      result.push({
        petId: pet_id,
        petName: pet_name,
        id: visit_id,
        vetId: visit_vet,
        date: visit_date,
        diagnostics: visit_diagnostics,
        treatment: visit_treatment,
        recommendations: visit_recommendations,
      });
    }
  );
  return result;
}

// ------------------------------------------------------------ CREATES
async function createPet(pet, client_id) {
  let query = {
    sql: "INSERT INTO pets (pet_name, pet_owner, pet_chip, pet_sex, pet_birthdate, pet_species, pet_breed, pet_sterilized, pet_vet, pet_observations, pet_clinical_observations, pet_registration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
    params: [
      checkNullish(pet.name),
      checkNullish(client_id),
      checkNullish(pet.chip),
      checkNullish(pet.sex),
      checkNullish(pet.birthdate),
      checkNullish(pet.species),
      checkNullish(pet.breed),
      checkNullish(pet.sterilized),
      checkNullish(pet.vet),
      checkNullish(pet.observations),
      checkNullish(pet.clinical_observations),
    ],
  };

  const result = await db.query(query.sql, query.params);

  let message = "Error in creating pet";

  if (result.affectedRows) {
    message = "Pet created successfully";
  }
  return { message };
}

// ------------------------------------------------------------ UPDATES
async function updatePet(id, pet) {
  let query = {
    sql: "UPDATE pets SET pet_name=?, pet_owner=?, pet_chip=?, pet_sex=?, pet_birthdate=?, pet_species=?, pet_breed=?, pet_sterilized=?, pet_vet=?, pet_observations=?, pet_clinical_observations=? WHERE pet_id=?",
    params: [
      checkNullish(pet.name),
      checkNullish(pet.owner),
      checkNullish(pet.chip),
      checkNullish(pet.sex),
      checkNullish(pet.birthdate),
      checkNullish(pet.species),
      checkNullish(pet.breed),
      checkNullish(pet.sterilized),
      checkNullish(pet.vet),
      checkNullish(pet.observations),
      checkNullish(pet.clinical_observations),
      checkNullish(id),
    ],
  };

  const result = await db.query(query.sql, query.params);

  let message = "Error in updating pet";

  if (result.affectedRows) {
    message = "Pet updated successfully";
  }

  return { message };
}

async function activatePet(id) {
  let query = {
    sql: "UPDATE pets SET pet_status=1 WHERE pet_id=?",
    params: [checkNullish(id)],
  };
  const result = await db.query(query.sql, query.params);
  let message = "Error in activating pet";

  if (result.affectedRows) {
    message = "Pet activated successfully";
  }
  return { message };
}

async function deactivatePet(id) {
  let query = {
    sql: "UPDATE pets SET pet_status=0 WHERE pet_id=?",
    params: [checkNullish(id)],
  };
  const result = await db.query(query.sql, query.params);
  let message = "Error in deactivating pet";

  if (result.affectedRows) {
    message = "Pet deactivated successfully";
  }
  return { message };
}

// ------------------------------------------------------------ DELETES
async function deletePet(id) {
  let query = {
    sql: "DELETE FROM pets WHERE pet_id=?",
    params: [checkNullish(id)],
  };
  const result = await db.query(query.sql, query.params);
  let message = "Error in deleting pet";

  if (result.affectedRows) {
    message = "Pet deleted successfully";
  }

  return { message };
}

module.exports = {
  getPets,
  getPetById,
  getSpeciesGroups,
  getBreedsGroups,
  getPetByOwner,
  getPetsTable,
  getPetConsumptionHistory,
  createPet,
  updatePet,
  activatePet,
  deactivatePet,
  deletePet,
};
