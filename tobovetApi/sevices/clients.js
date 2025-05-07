const db = require("./db");
const { dateToSQLFormat } = require("../utils/dateToSQLFormat");
const { checkNullish } = require("../utils/checkNullish");

async function getClients() {
  let query = `SELECT * FROM clients`;
  const data = await db.query(query);
  return data;
}

async function getClientsAndPetsAndContacts() {
  let query = `SELECT * FROM clients c 
    INNER JOIN pets p ON p.pet_owner = c.client_id 
    INNER JOIN client_contacts cc ON c.client_id = cc.client_id`;

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
      const currResultIdx = result.findIndex((row) => row.id === client_id);
      const currPet = {
        id: pet_id,
        pet: pet_name,
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
      };
      const currContact = {
        id: client_contact_id,
        contact: client_contact_name,
        phone: client_contact_tlf,
        email: client_contact_email,
      };

      if (currResultIdx < 0)
        result.push({
          id: client_id,
          client: client_name,
          document: client_document,
          status: client_status,
          address: client_dir,
          city: client_city,
          postcode: client_cp,
          province: client_prov,
          observations: client_observations,
          pets: [currPet],
          contacts: [currContact],
        });
      else {
        if (!result[currResultIdx].pets.find((row) => row.id === pet_id)) {
          result[currResultIdx].pets.push(currPet);
        }
        if (
          !result[currResultIdx].contacts.find(
            (row) => row.id === client_contact_id
          )
        )
          result[currResultIdx].contacts.push(currContact);
      }
    }
  );
  return result;
}

async function getClientsAndPetsAndContactsById(id) {
  let query = `SELECT * FROM clients c 
    INNER JOIN pets p ON p.pet_owner = c.client_id 
    INNER JOIN client_contacts cc ON c.client_id = cc.client_id
    WHERE c.client_id=${id}`;

  const data = await db.query(query);

  let result = {};
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
      const currPet = {
        id: pet_id,
        pet: pet_name,
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
      };
      const currContact = {
        id: client_contact_id,
        contact: client_contact_name,
        phone: client_contact_tlf,
        email: client_contact_email,
      };

      if (result.id === undefined)
        result = {
          id: client_id,
          client: client_name,
          document: client_document,
          status: client_status,
          address: client_dir,
          city: client_city,
          postcode: client_cp,
          province: client_prov,
          observations: client_observations,
          pets: [currPet],
          contacts: [currContact],
        };
      else {
        if (!result.pets.find((row) => row.id === pet_id)) {
          result.pets.push(currPet);
        }
        if (!result.contacts.find((row) => row.id === client_contact_id))
          result.contacts.push(currContact);
      }
    }
  );
  return result;
}
//By ID
async function getClientById(id) {
  let query = {
    sql: "SELECT * FROM clients WHERE client_id=?",
    params: [checkNullish(id)],
  };
  const data = await db.query(query.sql, query.params);

  return data;
}

async function getClientContactsById(id) {
  let query = {
    sql: "SELECT * FROM client_contacts WHERE client_id=?",
    params: [checkNullish(id)],
  };
  const data = await db.query(query.sql, query.params);

  return {
    data,
  };
}

async function getDocuments() {
  let query = {
    sql: "SELECT client_document FROM clients",
    params: [],
  };

  //If the document exists, return true
  const data = await db.query(query.sql, query.params);
  return data.map((row) => row.client_document);
}

async function existsDocument(document) {
  let query = {
    sql: "SELECT * FROM clients WHERE client_document=?",
    params: [checkNullish(document)],
  };

  //If the document exists, return true
  const data = await db.query(query.sql, query.params);
  return data.length > 0;
}

// ------------------------------------------------------------ CREATES

async function createClient(client) {
  let message = "Error in creating client";
  try {
    const queries = [];

    if (client.contacts.length === 0) {
      message = "There should be at least one contact info";
      return { message };
    }
    if (client.pets.length === 0) {
      message = "There should be at least one pet";
      return { message };
    }

    //Get the client id
    const client_id = await db.query(
      "SELECT client_id as id FROM clients ORDER BY client_id DESC LIMIT 1"
    );
    let last_inserted_id = 1;
    if (client_id[0]) last_inserted_id = client_id[0].id + 1;

    //Insert client
    queries.push({
      sql: "INSERT INTO clients (client_id, client_name, client_document, client_status, client_dir, client_city, client_cp, client_prov, client_observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      params: [
        last_inserted_id,
        checkNullish(client.client),
        checkNullish(client.document),
        1,
        checkNullish(client.address),
        checkNullish(client.city),
        checkNullish(Number(client.postcode)),
        checkNullish(client.province),
        checkNullish(client.observations),
      ],
    });

    //Insert pets
    if (client.pets) {
      for (const pet of client.pets) {
        queries.push({
          sql: "INSERT INTO pets (pet_owner, pet_name, pet_status, pet_chip, pet_sex, pet_birthdate, pet_species, pet_breed, pet_sterilized, pet_vet, pet_observations, pet_clinical_observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          params: [
            last_inserted_id,
            checkNullish(pet.pet),
            1,
            checkNullish(pet.chip),
            checkNullish(pet.sex),
            checkNullish(dateToSQLFormat(pet.birthdate)),
            checkNullish(pet.species),
            checkNullish(pet.breed),
            checkNullish(pet.sterilized),
            checkNullish(pet.vet),
            checkNullish(pet.observations),
            checkNullish(pet.clinicalObservations),
          ],
        });
      }
    }

    //Insert contacts
    if (client.contacts) {
      for (const contact of client.contacts) {
        queries.push({
          sql: "INSERT INTO client_contacts (client_id, client_contact_name, client_contact_tlf, client_contact_email) VALUES (?, ?, ?, ?)",
          params: [
            last_inserted_id,
            checkNullish(contact.contact),
            checkNullish(contact.phone),
            checkNullish(contact.email),
          ],
        });
      }
    }

    const result = await db.safeQuery(queries);

    if (result.length) message = "Client created successfully";
  } catch (err) {
    console.log("Error in creating client", err);
  }
  console.log("Message", message);
  return { message };
}

async function addClientContact(id, contact) {
  let query = {
    sql: "INSERT INTO client_contacts (client_id, client_contact_name, client_contact_tlf, client_contact_email) VALUES (?, ?, ?, ?)",
    params: [
      checkNullish(id),
      checkNullish(contact.name),
      checkNullish(contact.tlf),
      checkNullish(contact.email),
    ],
  };
  const result = await db.query(query.sql, query.params);

  let message = "Error in creating client contact";

  if (result.affectedRows) {
    message = "Client contact created successfully";
  }

  return { message };
}

// ------------------------------------------------------------ UPDATES
async function updateClient(client) {
  let message = "Error in updating client";

  try {
    const queries = [];
    //Update client
    queries.push({
      sql: "UPDATE clients SET client_name=?, client_document=?, client_status=?, client_dir=?, client_city=?, client_cp=?, client_prov=?, client_observations=? WHERE client_id=?",
      params: [
        client.client,
        checkNullish(client.document),
        checkNullish(client.status),
        checkNullish(client.address),
        checkNullish(client.city),
        checkNullish(client.postcode),
        checkNullish(client.province),
        checkNullish(client.observations),
        checkNullish(client.id),
      ],
    });

    //Update or insert pets
    if (client.pets) {
      for (const pet of client.pets) {
        if (pet.id === -1) {
          //Insert pet
          queries.push({
            sql: "INSERT INTO pets (pet_owner, pet_name, pet_status, pet_chip, pet_sex, pet_birthdate, pet_species, pet_breed, pet_sterilized, pet_vet, pet_observations, pet_clinical_observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            params: [
              checkNullish(client.id),
              checkNullish(pet.pet),
              checkNullish(pet.status),
              checkNullish(pet.chip),
              checkNullish(pet.sex),
              checkNullish(dateToSQLFormat(pet.birthdate)),
              checkNullish(pet.species),
              checkNullish(pet.breed),
              checkNullish(pet.sterilized),
              checkNullish(pet.vet),
              checkNullish(pet.observations),
              checkNullish(pet.clinicalObservations),
            ],
          });
        } else {
          //Update pet
          queries.push({
            sql: "UPDATE pets SET pet_name=?, pet_status=?, pet_chip=?, pet_sex=?, pet_birthdate=?, pet_species=?, pet_breed=?, pet_sterilized=?, pet_vet=?, pet_observations=?, pet_clinical_observations=? WHERE pet_id=?",
            params: [
              checkNullish(pet.pet),
              checkNullish(pet.status),
              checkNullish(pet.chip),
              checkNullish(pet.sex),
              checkNullish(dateToSQLFormat(pet.birthdate)),
              checkNullish(pet.species),
              checkNullish(pet.breed),
              checkNullish(pet.sterilized),
              checkNullish(pet.vet),
              checkNullish(pet.observations),
              checkNullish(pet.clinicalObservations),
              checkNullish(pet.id),
            ],
          });
        }
      }
    }

    //Update or insert contacts
    if (client.contacts) {
      for (const contact of client.contacts) {
        if (contact.id === -1) {
          //Insert contact
          queries.push({
            sql: "INSERT INTO client_contacts (client_id, client_contact_name, client_contact_tlf, client_contact_email) VALUES (?, ?, ?, ?)",
            params: [
              checkNullish(client.id),
              checkNullish(contact.contact),
              checkNullish(contact.phone),
              checkNullish(contact.email),
            ],
          });
        } else {
          //Update contact
          queries.push({
            sql: "UPDATE client_contacts SET client_contact_name=?, client_contact_tlf=?, client_contact_email=? WHERE client_contact_id=?",
            params: [
              checkNullish(contact.contact),
              checkNullish(contact.phone),
              checkNullish(contact.email),
              checkNullish(contact.id),
            ],
          });
        }
      }
    }

    const result = await db.safeQuery(queries);

    if (result.length) message = "Client updated successfully";
  } catch (err) {
    console.log("Error in updating client", err);
  }
  console.log("Message", message);
  return { message };
}

// ------------------------------------------------------------ DELETES
async function deleteClient(id) {
  const queries = [];
  queries.push({
    sql: "DELETE FROM client_contacts WHERE client_contact_id=?",
    params: [checkNullish(id)],
  });
  queries.push({
    sql: "DELETE FROM pets WHERE pet_id=?",
    params: [checkNullish(id)],
  });
  queries.push({
    sql: "DELETE FROM clients WHERE client_id=?",
    params: [checkNullish(id)],
  });

  const result = await db.safeQuery(queries);
  return { result };
}

module.exports = {
  getClients,
  getDocuments,
  existsDocument,
  createClient,
  updateClient,
  deleteClient,
  getClientsAndPetsAndContacts,
  getClientsAndPetsAndContactsById,
  getClientById,
  getClientContactsById,
  addClientContact,
};
