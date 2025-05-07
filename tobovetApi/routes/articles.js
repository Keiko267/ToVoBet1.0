const express = require("express");
const router = express.Router();
const articles = require("../sevices/articles");

router.get("/", async (req, res) => {
  try {
    const data = await articles.getArticles();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/inactive", async (req, res) => {
  try {
    const data = await articles.getInactiveArticles();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await articles.getAllArticles();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/groups", async (req, res) => {
  try {
    const data = await articles.getArticleGroups();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/vaccines", async (req, res) => {
  try {
    const data = await articles.getVaccines();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* POST article */
router.post("/", async function (req, res, next) {
  try {
    res.json(await articles.createArticle(req.body));
  } catch (err) {
    console.error(`Error while creating article`, err.message);
    next(err);
  }
});

/* PUT article */
router.put("/", async function (req, res, next) {
  try {
    res.json(await articles.updateArticle(req.body));
  } catch (err) {
    console.error(`Error while updating article`, err.message);
    next(err);
  }
});

router.put("/deactivate", async function (req, res, next) {
  try {
    res.json(await articles.deactivateArticle(req.body.id));
  } catch (err) {
    console.error(`Error while deactivating article`, err.message);
    next(err);
  }
});

/* DELETE article */
router.delete("/", async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await articles.deleteArticle(req.body.id));
  } catch (err) {
    console.error(`Error while deleting article`, err.message);
    next(err);
  }
});

module.exports = router;
