const express = require("express");
const router = express.Router();
const payments = require("../sevices/payments");

/* GET All clients and payments */
router.get("/", async function (_req, res, next) {
  try {
    if (_req.query.id)
      res.json(await payments.getPaymentAllInfo(_req.query.id));
    else res.json(await payments.getAllPaymentsAndClientsAndPets());
  } catch (err) {
    console.error(`Error while getting all payments and clients`, err.message);
    next(err);
  }
});
router.get("/company", async function (_req, res, next) {
  try {
    if (_req.query.id)
      res.json(await payments.getPaymentAllInfoCompany(_req.query.id));
    else res.json(await payments.getAllPaymentsAndCompanies());
  } catch (err) {
    console.error(`Error while getting all payments and clients`, err.message);
    next(err);
  }
});



router.get("/completed", async function (_req, res, next) {
  try {
    res.json(await payments.getAllPaymentsAndClientsAndPetsCompleted());
  } catch (err) {
    console.error(`Error while getting completed payments`, err.message);
    next(err);
  }
});
router.get("/completed/company", async function (_req, res, next) {
  try {
    res.json(await payments.getAllPaymentsAndCompaniesCompleted());
  } catch (err) {
    console.error(`Error while getting completed payments`, err.message);
    next(err);
  }
});

router.get("/pending", async function (_req, res, next) {
  try {
    res.json(await payments.getAllPaymentsAndClientsAndPetsPending());
  } catch (err) {
    console.error(`Error while getting completed payments`, err.message);
    next(err);
  }
});
router.get("/pending/company", async function (_req, res, next) {
  try {
    res.json(await payments.getAllPaymentsAndCompaniesPending());
  } catch (err) {
    console.error(`Error while getting completed payments`, err.message);
    next(err);
  }
});

/* GET active payments for client */
router.get("/pet/active", async function (_req, res, next) {
  try {
    res.json(await payments.getPetPaymentsActive(_req.query.id));
  } catch (err) {
    console.error(`Error while getting client's payments`, err.message);
    next(err);
  }
});
router.get("/company/active", async function (_req, res, next) {
  try {
    res.json(await payments.getCompanyPaymentsActive(_req.query.id));
  }
  catch (err) {
    console.error(`Error while getting client's payments`, err.message);
    next(err);
  }
});

/* POST payment */
router.post("/", async function (_req, res, next) {
  try {
    res.json(await payments.createPayment(_req.body));
  } catch (err) {
    console.error(`Error while creating payment`, err.message);
    next(err);
  }
});

/* PUT payment */
router.put("/", async function (_req, res, next) {
  try {
    res.json(await payments.updatePayment(_req.body));
  } catch (err) {
    console.error(`Error while updating payment`, err.message);
    next(err);
  }
});
/* DELETE payment */
router.delete("/", async function (_req, res, next) {
  try {
    res.json(await payments.deletePayment(_req.body.id));
  } catch (err) {
    console.error(`Error while deleting payment`, err.message);
    next(err);
  }
});
/* DELETE payment article */
router.delete("/article", async function (_req, res, next) {
  try {
    res.json(await payments.deletePaymentArticle(_req.body.id));
  } catch (err) {
    console.error(`Error while deleting payment`, err.message);
    next(err);
  }
});

module.exports = router;