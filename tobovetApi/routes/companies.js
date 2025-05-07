const express = require("express");
const router = express.Router();
const companies = require("../sevices/companies");

/* GET companies  */
router.get("/", async (_req, res) => {
  try {
    if (_req.query.id) res.json(await companies.getCompanyById(_req.query.id));
    else res.json(await companies.getCompanies());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* POST company */
router.post("/", async function (req, res, next) {
  try {
    res.json(await companies.createCompany(req.body));
  } catch (err) {
    console.error(`Error while creating company`, err.message);
    next(err);
  }
});

/* PUT company */
router.put("/", async function (req, res, next) {
  try {
    res.json(await companies.updateCompany(req.body));
  } catch (err) {
    console.error(`Error while updating company`, err.message);
    next(err);
  }
});

/* DELETE company */
router.delete("/", async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await companies.deleteCompany(req.body.id));
  } catch (err) {
    console.error(`Error while deleting company`, err.message);
    next(err);
  }
});

module.exports = router;
