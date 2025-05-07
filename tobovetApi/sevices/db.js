const mysql = require("mysql2/promise");

const config = {
  user: "root",
  password: "root",
  database: "tobovet",
  host: "localhost",
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  let results = null;
  try {
    [results] = await connection.execute(sql, params);
  } finally {
    connection.end();
    return results;
  }
}

async function safeQuery(queries) {
  const connection = await mysql.createConnection(config);
  let results = [];

  try {
    console.log("Transaction started");
    await connection.beginTransaction();
    for (const query of queries) {
      console.log(
        "Executing query: ",
        query.sql,
        " with params: ",
        query.params
      );
      const [result] = await connection.execute(query.sql, query.params);
      console.log("Query executed: ", result);
      results.push(result);
    }
    await connection.commit();
    console.log("Transaction commited");
  } catch (err) {
    console.error("Error while executing transaction: ", err);
    await connection.rollback();
    console.log("Transaction rolled back");
    throw err;
  } finally {
    connection.end();
    console.log("Connection closed");
    console.log("Results: ", results);
    return results;
  }
}

module.exports = {
  query,
  safeQuery,
};
