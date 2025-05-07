const db = require("./db");
const { checkNullish } = require("../utils/checkNullish");

// ------------------------------------------------------------ GETS
async function getCompanies() {
  const data = await db.query("SELECT * FROM companies");

  if (!data.length) message = "Companies not found";
  else message = "Companies found";

  console.log(message);

  return data.map((row) => ({
    id: row.company_id,
    name: row.company_name,
    nif: row.company_NIF,
    address: row.company_address,
    city: row.company_city,
    province: row.company_provence,
    postCode: row.pc,
    country: row.company_country,
  }));
}

async function getCompanyById(id) {
  const data = await db.query(
    `SELECT * FROM companies WHERE company_id = ${id}`
  );

  if (!data.length) message = "Company not found";
  else message = "Company found";

  console.log(message);

  return data.map((row) => ({
    id: row.company_id,
    name: row.company_name,
    nif: row.company_NIF,
    address: row.company_address,
    city: row.company_city,
    province: row.company_provence,
    postCode: row.pc,
    country: row.company_country,
  }));
}

// ------------------------------------------------------------ PUT
async function createCompany(company) {
  let query = {
    sql: `INSERT INTO companies
    (company_name, company_NIF, company_address, company_city, company_provence, company_pc, company_country)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    params: [
      checkNullish(company.name),
      checkNullish(company.nif),
      checkNullish(company.address),
      checkNullish(company.city),
      checkNullish(company.province),
      checkNullish(company.postCode),
      checkNullish(company.country),
    ],
  };
  console.log(company, query);
  const result = await db.query(query.sql, query.params);

  if (result.length) message = "Company created successfully";
  else message = "Error creating company";

  console.log(message);
  return { message };
}

// ------------------------------------------------------------ UPDATE
async function updateCompany(company) {
  let query = {
    sql: `UPDATE companies
    SET company_name=?, company_NIF=?, company_address=?, company_city=?, company_provence=?, company_pc=?, company_country=?
    WHERE company_id=?`,
    params: [
      checkNullish(company.name),
      checkNullish(company.nif),
      checkNullish(company.address),
      checkNullish(company.city),
      checkNullish(company.province),
      checkNullish(company.postCode),
      checkNullish(company.country),
      checkNullish(company.id),
    ],
  };

  console.log(company, query);

  const result = await db.query(query.sql, query.params);
  
  if (result.length) message = "Company updated successfully";
  else message = "Error updating company";

  return { message };
}

// ------------------------------------------------------------ DELETE
async function deleteCompany(id) {
  let query = {
    sql: "DELETE FROM companies WHERE company_id=?",
    params: [checkNullish(id)],
  };

  console.log(id, query);

  const result = await db.query(query.sql, query.params);

  if (result.length) message = "Company deleted successfully";
  else message = "Error deleting company";

  return { message };
}

// ------------------------------------------------------------ EXPORTS
module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};