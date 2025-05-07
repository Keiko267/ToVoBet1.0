const db = require("./db");
const { dateToSQLFormat } = require("../utils/dateToSQLFormat");
const { checkNullish } = require("../utils/checkNullish");

async function getAllPaymentsAndClientsAndPets() {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN pets pe ON pe.pet_id = pa.payment_pet
    JOIN clients c on pe.pet_owner = c.client_id
    ORDER BY pa.payment_date desc`
  );

  return data.map(
    ({
      payment_id,
      payment_date,
      payment_pending,
      payment_virtual,
      payment_type,
      payment_total,
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
      const currClient = {
        id: client_id,
        client: client_name,
        document: client_document,
        status: client_status,
        address: client_dir,
        city: client_city,
        postcode: client_cp,
        province: client_prov,
        observations: client_observations,
      };
      return {
        id: payment_id,
        client: currClient,
        pet: currPet,
        date: payment_date,
        virtual: payment_virtual,
        pending: payment_pending,
        type: payment_type,
        total: Math.round(payment_total * 100) / 100,
        payment_total,
      };
    }
  );
}

async function getAllPaymentsAndCompanies() {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN companies c ON pa.payment_company = c.company_id
    ORDER BY pa.payment_date desc`
  );
  return data.map(
    ({
      payment_id,
      payment_date,
      payment_pending,
      payment_virtual,
      payment_type,
      payment_total,
      company_id,
      company_name,
      company_NIF,
    }) => {
      const currCompany = {
        id: company_id,
        company: company_name,
        NIF: company_NIF,
      };
      return {
        id: payment_id,
        company: currCompany,
        date: payment_date,
        virtual: payment_virtual,
        pending: payment_pending,
        type: payment_type,
        total: Math.round(payment_total * 100) / 100,
        payment_total,
      };
    }
  );
}

async function getAllPaymentsAndClientsAndPetsCompleted() {
  const data = await db.query(
    `SELECT 
      payment_id, payment_date, payment_pending, payment_virtual, payment_type, payment_total, payment_number,
      client_id, client_name, 
      pet_id, pet_name,
      NULL as company_id, NULL as company_name
    FROM payments pa
        JOIN pets pe ON pe.pet_id = pa.payment_pet
        JOIN clients c on pe.pet_owner = c.client_id
    WHERE pa.payment_pending = 0
    UNION
    SELECT 
      payment_id, payment_date, payment_pending, payment_virtual, payment_type, payment_total, payment_number,
      NULL as client_id, NULL as client_name, 
      NULL as pet_id, NULL as pet_name,
      company_id, company_name
    FROM payments pa
        JOIN companies co ON pa.payment_company = co.company_id
    WHERE pa.payment_pending = 0
    ORDER BY payment_date DESC;`
  );

  return data.map(
    ({
      payment_id,
      payment_date,
      payment_pending,
      payment_virtual,
      payment_type,
      payment_total,
      payment_number,
      client_id,
      client_name,
      pet_id,
      pet_name,
      company_id,
      company_name,
    }) => {
      return {
        id: payment_id,
        clientId: client_id,
        client: client_name,
        petId: pet_id,
        pet: pet_name,
        companyId: company_id,
        company: company_name,
        date: payment_date,
        pending: payment_pending,
        virtual: payment_virtual,
        type: payment_type,
        total: Math.round(payment_total * 100) / 100,
        number: payment_number,
      };
    }
  );
}

async function getAllPaymentsAndCompaniesCompleted() {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN companies c ON pa.payment_company = c.company_id
    WHERE pa.payment_pending=0
    ORDER BY pa.payment_date desc`
  );
  return data.map(
    ({
      payment_id,
      payment_date,
      payment_pending,
      payment_virtual,
      payment_type,
      payment_total,
      company_id,
      company_name,
      company_NIF,
      company_address,
      company_city,
      company_provence,
      company_pc,
      company_country,
    }) => {
      const currCompany = {
        id: company_id,
        name: company_name,
        nif: company_NIF,
        address: company_address,
        city: company_city,
        province: company_provence,
        postCode: company_pc,
        country: company_country,
      };
      return {
        id: payment_id,
        company: currCompany,
        date: payment_date,
        virtual: payment_virtual,
        pending: payment_pending,
        type: payment_type,
        total: Math.round(payment_total * 100) / 100,
        payment_total,
      };
    }
  );
}

async function getAllPaymentsAndClientsAndPetsPending() {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN pets pe ON pe.pet_id = pa.payment_pet
    JOIN clients c on pe.pet_owner = c.client_id
    WHERE pa.payment_pending=1
    ORDER BY pa.payment_date desc`
  );

  return data.map(
    ({
      payment_id,
      payment_date,
      payment_pending,
      payment_virtual,
      payment_type,
      payment_total,
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
      const currClient = {
        id: client_id,
        client: client_name,
        document: client_document,
        status: client_status,
        address: client_dir,
        city: client_city,
        postcode: client_cp,
        province: client_prov,
        observations: client_observations,
      };
      return {
        id: payment_id,
        client: currClient,
        pet: currPet,
        date: payment_date,
        virtual: payment_virtual,
        pending: payment_pending,
        type: payment_type,
        total: Math.round(payment_total * 100) / 100,
        payment_total,
      };
    }
  );
}

async function getAllPaymentsAndCompaniesPending() {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN companies c ON pa.payment_company = c.company_id
    WHERE pa.payment_pending=1
    ORDER BY pa.payment_date desc`
  );
  return data.map(
    ({
      payment_id,
      payment_date,
      payment_pending,
      payment_virtual,
      payment_type,
      payment_total,
      company_id,
      company_name,
      company_NIF,
    }) => {
      const currCompany = {
        id: row.company_id,
        name: row.company_name,
        nif: row.company_NIF,
        address: row.company_address,
        city: row.company_city,
        province: row.company_provence,
        postCode: row.company_pc,
        country: row.company_country,
      };
      return {
        id: payment_id,
        company: currCompany,
        date: payment_date,
        virtual: payment_virtual,
        pending: payment_pending,
        type: payment_type,
        total: Math.round(payment_total * 100) / 100,
        payment_total,
      };
    }
  );
}

async function getPetPaymentsActive(id) {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN pets pe ON pa.payment_pet = pe.pet_id
    JOIN clients c on pe.pet_owner = c.client_id
    LEFT JOIN payments_articles paa ON pa.payment_id = paa.payments_id
    LEFT JOIN articles a ON a.article_id = paa.articles_id
    WHERE pa.payment_pet=${id}
    AND pa.payment_pending=1`
  );

  let result = {};
  data.forEach(
    (
      {
        payment_id,
        payment_date,
        payment_number,
        payment_virtual,
        payment_pending,
        payment_type,
        payment_total,
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
        payments_articles_id,
        payments_articles_discount,
        payments_articles_quantity,
        payments_articles_tax,
        payments_articles_pvp,
        article_id,
        article_name,
        article_group,
        article_pvp,
        article_validity_period,
        article_stock,
      },
      idx
    ) => {
      const currArticle = {
        id: payments_articles_id,
        discount: Math.round(payments_articles_discount * 100) / 100,
        quantity: payments_articles_quantity,
        tax: Math.round(payments_articles_tax * 100) / 100,
        articleId: article_id,
        name: article_name,
        group: article_group,
        pvp:
          Math.round(
            (payment_pending ? article_pvp : payments_articles_pvp) * 100
          ) / 100,
        validity: article_validity_period,
        stock: article_stock,
      };
      if (idx === 0) {
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
        const currClient = {
          id: client_id,
          client: client_name,
          document: client_document,
          status: client_status,
          address: client_dir,
          city: client_city,
          postcode: client_cp,
          province: client_prov,
          observations: client_observations,
        };
        result = {
          id: payment_id,
          client: currClient,
          pet: currPet,
          date: payment_date,
          virtual: payment_virtual,
          pending: payment_pending,
          type: payment_type,
          total: Math.round(payment_total * 100) / 100,
          articles: currArticle.id ? [currArticle] : [],
          number: payment_number,
        };
      } else if (currArticle.id) result.articles.push(currArticle);
    }
  );

  return result;
}

async function getCompanyPaymentsActive(id) {
  const data = await db.query(
    `SELECT *
    FROM payments pa
    JOIN companies c ON pa.payment_company = c.company_id
    LEFT JOIN payments_articles paa ON pa.payment_id = paa.payments_id
    LEFT JOIN articles a ON a.article_id = paa.articles_id
    WHERE pa.payment_company=${id}
    AND pa.payment_pending=1`
  );

  let result = {};
  data.forEach(
    (
      {
        payment_id,
        payment_date,
        payment_number,
        payment_virtual,
        payment_pending,
        payment_type,
        payment_total,
        company_id,
        company_name,
        company_NIF,
        company_address,
        company_city,
        company_provence,
        company_pc,
        company_country,
        payments_articles_id,
        payments_articles_discount,
        payments_articles_quantity,
        payments_articles_tax,
        payments_articles_pvp,
        article_id,
        article_name,
        article_group,
        article_pvp,
        article_validity_period,
        article_stock,
      },
      idx
    ) => {
      const currArticle = {
        id: payments_articles_id,
        discount: Math.round(payments_articles_discount * 100) / 100,
        quantity: payments_articles_quantity,
        tax: Math.round(payments_articles_tax * 100) / 100,
        articleId: article_id,
        name: article_name,
        group: article_group,
        pvp:
          Math.round(
            (payment_pending ? article_pvp : payments_articles_pvp) * 100
          ) / 100,
        validity: article_validity_period,
        stock: article_stock,
      };
      if (idx === 0) {
        const currCompany = {
          id: company_id,
          name: company_name,
          nif: company_NIF,
          address: company_address,
          city: company_city,
          province: company_provence,
          postCode: company_pc,
          country: company_country,
        };
        result = {
          id: payment_id,
          company: currCompany,
          date: payment_date,
          virtual: payment_virtual,
          pending: payment_pending,
          type: payment_type,
          total: Math.round(payment_total * 100) / 100,
          articles: currArticle.id ? [currArticle] : [],
          number: payment_number,
        };
      } else if (currArticle.id) result.articles.push(currArticle);
    }
  );
  return result;
}

//Get paymentAllInfo, this is a join of payments and payments_articles and articles that
//includes all the information of the payment and the articles
//and adds a column with the total of the payment
//payment_total = SUM((articles.articles_pvp * payments_articles.payments_articles_quantity) * (1 - payments_articles.payments_articles_discount/100) * (1 + payments_articles.payments_articles_tax/100))

async function getPaymentAllInfo(id) {
  const data = await db.query(
    `SELECT *
    FROM payments pa 
    JOIN pets pe ON pa.payment_pet = pe.pet_id
    JOIN clients c on c.client_id = pe.pet_owner
    LEFT JOIN payments_articles paa ON pa.payment_id = paa.payments_id
    LEFT JOIN articles a ON paa.articles_id = a.article_id
    WHERE pa.payment_id = ${id}`
  );

  let result = {};
  data.forEach(
    (
      {
        payment_id,
        payment_date,
        payment_number,
        payment_virtual,
        payment_pending,
        payment_type,
        payment_total,
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
        payments_articles_id,
        payments_articles_discount,
        payments_articles_quantity,
        payments_articles_tax,
        payments_articles_pvp,
        article_id,
        article_name,
        article_group,
        article_pvp,
        article_validity_period,
        article_stock,
      },
      idx
    ) => {
      const currArticle = {
        id: payments_articles_id,
        discount: Math.round(payments_articles_discount * 100) / 100,
        quantity: payments_articles_quantity,
        tax: Math.round(payments_articles_tax * 100) / 100,
        articleId: article_id,
        name: article_name,
        group: article_group,
        pvp:
          Math.round(
            (payment_pending ? article_pvp : payments_articles_pvp) * 100
          ) / 100,
        validity: article_validity_period,
        stock: article_stock,
      };
      if (idx === 0) {
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
        const currClient = {
          id: client_id,
          client: client_name,
          document: client_document,
          status: client_status,
          address: client_dir,
          city: client_city,
          postcode: client_cp,
          province: client_prov,
          observations: client_observations,
        };
        result = {
          id: payment_id,
          client: currClient,
          pet: currPet,
          date: payment_date,
          virtual: payment_virtual,
          pending: payment_pending,
          type: payment_type,
          total: Math.round(payment_total * 100) / 100,
          articles: currArticle.id ? [currArticle] : [],
          number: payment_number,
        };
      } else if (currArticle.id) result.articles.push(currArticle);
    }
  );
  return result;
}

async function getPaymentAllInfoCompany(id) {
  const data = await db.query(
    `SELECT *
    FROM payments pa 
    JOIN companies c ON pa.payment_company = c.company_id
    LEFT JOIN payments_articles paa ON pa.payment_id = paa.payments_id
    LEFT JOIN articles a ON paa.articles_id = a.article_id
    WHERE pa.payment_id = ${id}`
  );
  let result = {};
  data.forEach(
    (
      {
        payment_id,
        payment_date,
        payment_number,
        payment_virtual,
        payment_pending,
        payment_type,
        payment_total,
        company_id,
        company_name,
        company_NIF,
        company_address,
        company_city,
        company_provence,
        company_pc,
        company_country,
        payments_articles_id,
        payments_articles_discount,
        payments_articles_quantity,
        payments_articles_tax,
        payments_articles_pvp,
        article_id,
        article_name,
        article_group,
        article_pvp,
        article_validity_period,
        article_stock,
      },
      idx
    ) => {
      const currArticle = {
        id: payments_articles_id,
        discount: Math.round(payments_articles_discount * 100) / 100,
        quantity: payments_articles_quantity,
        tax: Math.round(payments_articles_tax * 100) / 100,
        articleId: article_id,
        name: article_name,
        group: article_group,
        pvp:
          Math.round(
            (payment_pending ? article_pvp : payments_articles_pvp) * 100
          ) / 100,
        validity: article_validity_period,
        stock: article_stock,
      };
      if (idx === 0) {
        const currCompany = {
          id: company_id,
          name: company_name,
          nif: company_NIF,
          address: company_address,
          city: company_city,
          province: company_provence,
          postCode: company_pc,
          country: company_country,
        };
        result = {
          id: payment_id,
          company: currCompany,
          date: payment_date,
          virtual: payment_virtual,
          pending: payment_pending,
          type: payment_type,
          total: Math.round(payment_total * 100) / 100,
          articles: currArticle.id ? [currArticle] : [],
          number: payment_number,
        };
      } else if (currArticle.id) result.articles.push(currArticle);
    }
  );
  return result;
}
// ------------------------------------------------------------ CREATES

async function createPayment(payment) {
  console.log("CREATING PAYMENT: =====================", payment);
  let message = "Error in creating payment";
  try {
    const queries = [];

    const tempPayment = await db.query(
      "SELECT payment_id, payment_number FROM payments WHERE payment_number IS NOT NULL ORDER BY payment_id DESC LIMIT 1"
    );
    const lastPayment = await db.query(
      "SELECT payment_id FROM payments ORDER BY payment_id DESC LIMIT 1"
    );
    const lastInsertedId = lastPayment[0].payment_id + 1;

    const currYear = new Date().getFullYear().toString().substring(2, 4);
    const lastPaymentN = tempPayment[0].payment_number.toString();
    const paymentId =
      lastPaymentN.substring(lastPaymentN.length - 2, lastPaymentN.length) ===
      currYear
        ? +lastPaymentN.substring(0, lastPaymentN.length - 2) + 1
        : 1;
    const newNumber = paymentId + currYear;

    //Insert the payment
    queries.push({
      sql: `INSERT INTO payments 
      (payment_id, payment_pet, payment_company, payment_type, payment_virtual, payment_pending,
      payment_date, payment_register, payment_total, payment_number) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params: [
        checkNullish(lastInsertedId),
        checkNullish((payment.pet && payment.pet.id) || null),
        checkNullish((payment.company && payment.company.id) || null),
        checkNullish(payment.type),
        checkNullish(payment.virtual),
        checkNullish(payment.pending),
        checkNullish(dateToSQLFormat(payment.date)),
        checkNullish(1), // TO DO: change to user id
        checkNullish(payment.total),
        checkNullish(payment.virtual ? null : newNumber),
      ],
    });
    if (payment.articles) {
      //Insert the payment articles, if there are any
      for (const article of payment.articles) {
        queries.push({
          sql: `INSERT INTO payments_articles (payments_id, articles_id, payments_articles_quantity,
          payments_articles_discount, payments_articles_tax, payments_articles_pvp) VALUES (?, ?, ?, ?, ?, ?)`,
          params: [
            checkNullish(lastInsertedId),
            checkNullish(article.articleId),
            checkNullish(article.quantity),
            checkNullish(article.discount),
            checkNullish(article.tax),
            checkNullish(article.pvp),
          ],
        });
      }
    }

    const result = await db.safeQuery(queries);
    message = "Payment created successfully";
  } catch (err) {
    console.error("Error in creating payment: ", err);
  }
  console.log("Message: ", message);
  return { message };
}

// ------------------------------------------------------------ UPDATES

async function updatePayment(payment) {
  console.log("UPDATING PAYMENT: =====================", payment);
  let message = "Error in updating payment";

  try {
    if (!payment.number && !payment.virtual) {
      const tempPayment = await db.query(
        "SELECT payment_id, payment_number FROM payments WHERE payment_number IS NOT NULL ORDER BY payment_id DESC LIMIT 1"
      );
      const currYear = new Date().getFullYear().toString().substring(2, 4);
      const lastPaymentN = tempPayment[0].payment_number.toString();
      const paymentId =
        lastPaymentN.substring(lastPaymentN.length - 2, lastPaymentN.length) ===
        currYear
          ? +lastPaymentN.substring(0, lastPaymentN.length - 2) + 1
          : 1;
      payment.number = paymentId + currYear;
    } else if (payment.number && payment.virtual) payment.number = null;

    const queries = [];
    queries.push({
      sql: `UPDATE payments SET payment_type=?, payment_virtual=?, payment_pending=?, payment_date=?, payment_register=?, payment_total=?, 
      payment_number=? WHERE payment_id=?`,
      params: [
        checkNullish(payment.type),
        checkNullish(payment.virtual),
        checkNullish(payment.pending),
        checkNullish(dateToSQLFormat(payment.date)),
        checkNullish(1), // TO DO: change to user id
        checkNullish(payment.total),
        checkNullish(payment.number),
        checkNullish(payment.id),
      ],
    });
    //Update or insert the payment articles
    for (const article of payment.articles) {
      if (article.id < 1) {
        //Create new payment_article
        queries.push({
          sql: "INSERT INTO payments_articles (payments_id, articles_id, payments_articles_quantity, payments_articles_discount, payments_articles_tax, payments_articles_pvp ) VALUES (?, ?, ?, ?, ?, ?)",
          params: [
            checkNullish(payment.id),
            checkNullish(article.articleId),
            checkNullish(article.quantity),
            checkNullish(article.discount),
            checkNullish(article.tax),
            checkNullish(article.pvp),
          ],
        });
      } else {
        //Update payment_article
        queries.push({
          sql: `UPDATE payments_articles SET payments_articles_quantity=?, payments_articles_discount=?,
          payments_articles_tax=?, payments_articles_pvp=? WHERE payments_articles_id=?`,
          params: [
            checkNullish(article.quantity),
            checkNullish(article.discount),
            checkNullish(article.tax),
            checkNullish(article.pvp),
            checkNullish(article.id),
          ],
        });
      }
    }

    const result = await db.safeQuery(queries);
    message = "Payment updated successfully";
  } catch (err) {
    console.log("Error in updating payment: ", err);
  }
  console.log("Message: ", message);
  return { message };
}

// ------------------------------------------------------------ DELETES
async function deletePayment(id) {
  console.log("DELETING PAYMENT: =====================", id);
  let message = "Error in deleting payment";
  try {
    const queries = [];
    queries.push({
      sql: "DELETE FROM payments_articles WHERE payments_id=?",
      params: [id],
    });
    queries.push({
      sql: "DELETE FROM payments WHERE payment_id=?",
      params: [id],
    });
    const result = await db.safeQuery(queries);
    message = "Payment deleted successfully";
  } catch (err) {
    console.error(err);
  }
  return { message };
}

async function deletePaymentArticle(id) {
  console.log("delete", id);
  let query = {
    sql: "DELETE FROM payments_articles WHERE payments_articles_id=?",
    params: [checkNullish(id)],
  };
  const result = await db.query(query.sql, query.params);

  let message = "Error in deleting payment article";

  if (result.affectedRows) {
    message = "Payment article deleted successfully";
  }

  return { message };
}

module.exports = {
  getAllPaymentsAndClientsAndPets,
  getAllPaymentsAndCompanies,
  getAllPaymentsAndClientsAndPetsCompleted,
  getAllPaymentsAndCompaniesCompleted,
  getAllPaymentsAndClientsAndPetsPending,
  getAllPaymentsAndCompaniesPending,
  getPetPaymentsActive,
  getCompanyPaymentsActive,
  getPaymentAllInfo,
  getPaymentAllInfoCompany,
  createPayment,
  updatePayment,
  deletePayment,
  deletePaymentArticle,
};
