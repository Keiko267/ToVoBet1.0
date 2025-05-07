const express = require("express");
const router = express.Router();
const users = require("../sevices/users");

/* GET users. (arrayConditions) */
router.get("/", async function (_req, res, next) {
  try {
    if (_req.query.id) res.json(await users.getById(_req.query.id));
    else res.json(await users.get());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* POST user */
router.post("/", async function (_req, res, next) {
  try {
    res.json(await users.create(_req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

/* PUT user */
router.put("/:id", async function (_req, res, next) {
  try {
    res.json(await users.update(_req.params.id, _req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* PUT user photo */
router.put("/:id/photo", async function (_req, res, next) {
  try {
    res.json(await users.updatePhoto(_req.params.id, _req.body));
  } catch (err) {
    console.error(`Error while updating user photo`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete("/:id", async function (_req, res, next) {
  try {
    res.json(await programmingLanguages.remove(_req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

module.exports = router;
