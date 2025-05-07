const express = require("express");
const router = express.Router();
const visits = require("../sevices/visits");

/* GET visits. */
router.get("/", async function (_req, res, next) {
  try {
    res.json(await visits.getVisits());
  } catch (err) {
    console.error(`Error while getting visits `, err.message);
    next(err);
  }
});

/* GET visit by Client id */
router.get("/client/:id", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsByClient(_req.params.id));
  } catch (err) {
    console.error(`Error while getting visit by client id`, err.message);
    next(err);
  }
});

/* GET visit by Pet id */
router.get("/pet", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsByPet(_req.query.id));
  } catch (err) {
    console.error(`Error while getting visit by pet id`, err.message);
    next(err);
  }
});

/* GET visit by Vet id */
router.get("/vet/:id", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsByVet(_req.params.id));
  } catch (err) {
    console.error(`Error while getting visit by vet id`, err.message);
    next(err);
  }
});

/* GET visits and clients */
router.get("/clients", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsAndClients());
  } catch (err) {
    console.error(`Error while getting visits and clients`, err.message);
    next(err);
  }
});

/* GET visits today */
router.get("/today", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsToday());
  } catch (err) {
    console.error(`Error while getting visits today`, err.message);
    next(err);
  }
});
/* GET visits historical */
router.get("/historical", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsHistorical());
  } catch (err) {
    console.error(`Error while getting visits historical`, err.message);
    next(err);
  }
});
/* GET visits future */
router.get("/future", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsFuture());
  } catch (err) {
    console.error(`Error while getting visits future`, err.message);
    next(err);
  }
});

/* GET visits extended */
router.get("/extended", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitsExtended());
  } catch (err) {
    console.error(`Error while getting visits extended`, err.message);
    next(err);
  }
});

/* GET visit by id */
router.get("/:id", async function (_req, res, next) {
  try {
    res.json(await visits.getVisitById(_req.params.id));
  } catch (err) {
    console.error(`Error while getting visit by id`, err.message);
    next(err);
  }
});



/* POST visit */
router.post("/", async function (_req, res, next) {
  try {
    res.json(await visits.createVisit(_req.body));
  } catch (err) {
    console.error(`Error while creating visit`, err.message);
    next(err);
  }
});

/* PUT visit */
router.put("/", async function (_req, res, next) {
  console.log("PUT visit", _req.body);
  try {
    res.json(await visits.updateVisit(_req.body));
  } catch (err) {
    console.error(`Error while updating visit`, err.message);
    next(err);
  }
});

/* PUT visit completed */
router.put("/complete", async function (_req, res, next) {
  try {
    res.json(await visits.completeVisit(_req.body.id));
  } catch (err) {
    console.error(`Error while completing visit`, err.message);
    next(err);
  }
});

/* DELETE visit */
router.delete("/", async function (_req, res, next) {
  try {
    res.json(await visits.deleteVisit(_req.body.id));
  } catch (err) {
    console.error(`Error while deleting visit`, err.message);
    next(err);
  }
});

module.exports = router;
