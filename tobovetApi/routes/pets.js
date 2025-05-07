const express = require("express");
const router = express.Router();
const pets = require("../sevices/pets");

/* GET pets. */
router.get("/", async function (_req, res, next) {
  try {
    res.json(await pets.getPets());
  } catch (err) {
    console.error(`Error while getting pets `, err.message);
    next(err);
  }
});

/* GET pets and clients */
router.get("/clients", async function (_req, res, next) {
    try {
        res.json(await pets.getPetsTable());
    } catch (err) {
        console.error(`Error while getting pets and clients`, err.message);
        next(err);
    }
});

/* GET pets breeds */
router.get("/breeds", async function (_req, res, next) {
    try {
        res.json(await pets.getBreedsGroups());
    } catch (err) {
        console.error(`Error while getting pets breeds`, err.message);
        next(err);
    }
    }
);

/* GET pets species */
router.get("/species", async function (_req, res, next) {
    try {
        res.json(await pets.getSpeciesGroups());
    } catch (err) {
        console.error(`Error while getting pets species`, err.message);
        next(err);
    }
    }
);


/* GET pet consumption history by pet id */
router.get("/consumption", async function (_req, res, next) {
  try {
    res.json(await pets.getPetConsumptionHistory(_req.query.id));
  } catch (err) {
    console.error(`Error while getting pet consumption history by pet id`, err.message);
    next(err);
  }
  }
);


/* POST pet */
router.post('/', async function(_req, res, next) {
  try {
    res.json(await pets.createPet(_req.body));
  } catch (err) {
    console.error(`Error while creating pet`, err.message);
    next(err);
  }
});

/* PUT pet */
router.put('/:id', async function(_req, res, next) {
  try {
    res.json(await pets.updatePet(_req.params.id, _req.body));
  } catch (err) {
    console.error(`Error while updating pet`, err.message);
    next(err);
  }
});

/* activate pet */
router.put('/:id/activate', async function(_req, res, next) {
  try {
    res.json(await pets.activatePet(_req.params.id));
  } catch (err) {
    console.error(`Error while activating pet`, err.message);
    next(err);
  }
});

/* deactivate pet */
router.put('/:id/deactivate', async function(_req, res, next) {
  try {
    res.json(await pets.deactivatePet(_req.params.id));
  } catch (err) {
    console.error(`Error while deactivating pet`, err.message);
    next(err);
  }
});

/* DELETE pet */
router.delete('/:id', async function(_req, res, next) {
  try {
    res.json(await pets.deletePet(_req.params.id));
  } catch (err) {
    console.error(`Error while deleting pet`, err.message);
    next(err);
  }
});




module.exports = router;
