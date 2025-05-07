const express = require("express");
const router = express.Router();
const visits = require("../sevices/vaccinations");

/* GET vaccination dates */
router.get("/", async function (_req, res, next) {
  try {
    res.json(await visits.getVaccinations());
  } catch (err) {
    console.error(`Error while getting vaccination dates`, err.message);
    next(err);
  }
});

/* GET vaccination for one pet */
router.get("/pet", async function (_req, res, next) {
  try {
    res.json(await visits.getVaccinationsByPet(_req.query.id));
  } catch (err) {
    console.error(`Error while getting vaccination dates for pet`, err.message);
    next(err);
  }
});

/* POST vaccination date */
router.post("/", async function (_req, res, next) {
  try {
    res.json(await visits.createVaccination(_req.body));
  } catch (err) {
    console.error(`Error while creating vaccination date`, err.message);
    next(err);
  }
});

router.post("/secondVisit", async function (_req, res, next) {
  try {
    res.json(await visits.createSecondVisit(_req.body.visit));
  } catch (err) {
    console.error(`Error while creating second vaccination date`, err.message);
    next(err);
  }
});

/* PUT vaccination date */
router.put("/", async function (_req, res, next) {
  try {
    res.json(await visits.updateVaccination(_req.body));
  } catch (err) {
    console.error(`Error while updating vaccination date`, err.message);
    next(err);
  }
});

/* DELETE vaccination date */
router.delete("/", async function (_req, res, next) {
  try {
    res.json(await visits.deleteVaccination(_req.body.id));
  } catch (err) {
    console.error(`Error while deleting vaccination date`, err.message);
    next(err);
  }
});

module.exports = router;
