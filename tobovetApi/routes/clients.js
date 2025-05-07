const express = require("express");
const router = express.Router();
//const verifyToken = require("../middlewares/auth");
const clients = require("../sevices/clients");

router.get("/", async function (_req, res, next) {
  try {
    if (_req.query.id) res.json(await clients.getClientById(_req.query.id));
    else res.json(await clients.getClients());
  } catch (err) {
    console.error(`Error while getting clients `, err.message);
    next(err);
  }
});

/* GET client and contacts */
router.get("/pets/contacts", async function (_req, res, next) {
  try {
    if (_req.query.id)
      res.json(await clients.getClientsAndPetsAndContactsById(_req.query.id));
    else res.json(await clients.getClientsAndPetsAndContacts());
  } catch (err) {
    console.error(
      `Error while getting client and pets and contacts`,
      err.message
    );
    next(err);
  }
});

router.get("/document", async function (_req, res, next) {
  try {
    if (_req?.query?.document)
      res.json(await clients.existsDocument(_req.query.document));
    else res.json(await clients.getDocuments());
  } catch (err) {
    console.error(`Error while getting client by document`, err.message);
    next(err);
  }
});

/* POST client */
router.post("/", async function (_req, res, next) {
  try {
    res.json(await clients.createClient(_req.body));
  } catch (err) {
    console.error(`Error while creating client`, err.message);
    next(err);
  }
});

/* PUT client */
router.put("/", async function (_req, res, next) {
  try {
    res.json(await clients.updateClient(_req.body));
  } catch (err) {
    console.error(`Error while updating client`, err.message);
    next(err);
  }
});

/* DELETE client */
router.delete("/", async function (_req, res, next) {
  try {
    res.json(await clients.deleteClient(_req.query.id));
  } catch (err) {
    console.error(`Error while deleting client`, err.message);
    next(err);
  }
});

module.exports = router;
