const db = require("./db");
const { checkNullish } = require("../utils/checkNullish");

// ------------------------------------------------------------ GETS
async function getArticles() {
  const data = await db.query("SELECT * FROM articles WHERE article_active=1");

  return data.map((row) => ({
    id: row.article_id,
    name: row.article_name,
    group: row.article_group,
    pvp: Math.round(row.article_pvp * 100) / 100,
    validity: row.article_validity_period,
    stock: row.article_stock,
    active: row.article_active,
  }));
}

async function getAllArticles() {
  const data = await db.query("SELECT * FROM articles");

  return data.map((row) => ({
    id: row.article_id,
    name: row.article_name,
    group: row.article_group,
    pvp: Math.round(row.article_pvp * 100) / 100,
    validity: row.article_validity_period,
    stock: row.article_stock,
    active: row.article_active,
  }));
}

async function getInactiveArticles() {
  const data = await db.query(
    `SELECT * FROM articles WHERE article_active=0`
  );

  return data.map((row) => ({
    id: row.article_id,
    name: row.article_name,
    group: row.article_group,
    pvp: Math.round(row.article_pvp * 100) / 100,
    validity: row.article_validity_period,
    stock: row.article_stock,
    active: row.article_active,
  }));
}

async function getArticleGroups() {
  const data = await db.query(
    `SELECT DISTINCT article_group FROM articles`
  );

  return data.map((row) => row.article_group);
}
async function getVaccines() {
  const data = await db.query(
    `SELECT * FROM articles WHERE article_group LIKE 'Vacuna'`
  );

  return data.map((row) => ({
    id: row.article_id,
    name: row.article_name,
    group: row.article_group,
    pvp: Math.round(row.article_pvp * 100) / 100,
    validity: row.article_validity_period,
    stock: row.article_stock,
    active: row.article_active,
  }));
}

// ------------------------------------------------------------ PUT
async function createArticle(article) {
  const query = {
    sql: `INSERT INTO articles 
    (article_name, article_group, article_pvp, article_stock, article_validity_period) 
    VALUES (?, ?, ?, ?, ?)`,
    params: [
      checkNullish(article.name),
      checkNullish(article.group),
      checkNullish(article.pvp),
      checkNullish(article.stock),
      checkNullish(article.validity),
    ],
  };
  console.log(article, query);
  const result = await db.query(query.sql, query.params);

  console.log(result);
  return result;
}

// ------------------------------------------------------------ UPDATE
async function updateArticle(article) {
  console.log(article);
  let select = `SELECT article_name FROM articles WHERE article_id = ${article.id}`;
  const selectArticle = await db.query(select);
  console.log(selectArticle);
  if (selectArticle.length > 0) {
    if (article.name === selectArticle[0].article_name) {
      const query = {
        sql: `UPDATE articles 
        SET article_name=?, article_group=?, article_pvp=?, article_stock=?, article_validity_period=? 
        WHERE article_id=?`,
        params: [
          checkNullish(article.name),
          checkNullish(article.group),
          checkNullish(article.pvp),
          checkNullish(article.stock),
          checkNullish(article.validity),
          checkNullish(article.id),
        ],
      };
      const result = await db.query(query.sql, query.params);
      console.log(result);
    } else {
      // Update active to false and insert new article
      const query = {
        sql: `UPDATE articles 
        SET article_active = 0
        WHERE article_id=?`,
        params: [checkNullish(article.id)],
      };

      const query2 = {
        sql: `INSERT INTO articles 
        (article_name, article_group, article_pvp, article_stock, article_validity_period) 
        VALUES (?, ?, ?, ?, ?)`,
        params: [
          checkNullish(article.name),
          checkNullish(article.group),
          checkNullish(article.pvp),
          checkNullish(article.stock),
          checkNullish(article.validity),
        ],
      };
      const result = await db.safeQuery([query, query2]);
      console.log(result);
    }
  }
}

async function deactivateArticle(id) {
  const query = {
    sql: `UPDATE articles 
    SET article_active = 0
    WHERE article_id=?`,
    params: [checkNullish(id)],
  };

  const result = await db.query(query.sql, query.params);
  console.log(result);
  return result;
}

// ------------------------------------------------------------ DELETE
async function deleteArticle(id) {
  let query = {
    sql: `SELECT articles_id FROM payments_articles WHERE articles_id = ?`,
    params: [checkNullish(id)],
  };
  const selectArticle = await db.query(query.sql, query.params);
  //If the article exists in a payment, instead of deleting it, it will be deactivated
  if (selectArticle && selectArticle.length > 0) {
    query = {
      sql: `UPDATE articles 
      SET article_active = 0
      WHERE article_id=?`,
      params: [checkNullish(id)],
    };
    const result = await db.query(query.sql, query.params);
    console.log(result);
    return result;
  }
  else {
    query = {
      sql: "DELETE FROM articles WHERE article_id=?",
      params: [checkNullish(id)],
    };
  
    const result = await db.query(query.sql, query.params);
  
    console.log(result);
    return result;
  }
}

// ------------------------------------------------------------ EXPORTS
module.exports = {
  getArticles,
  getAllArticles,
  getInactiveArticles,
  getArticleGroups,
  getVaccines,
  createArticle,
  updateArticle,
  deactivateArticle,
  deleteArticle,
};
