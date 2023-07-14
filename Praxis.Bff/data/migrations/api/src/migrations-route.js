const express = require("express");
const migrationsService = require('./migrations-service');
const log = require('./log');

const router = express.Router();

router.get('/', async function(req, res, next) {
  log.info('migrations-route', 'get migrations has been called');
  try {
    res.json(await migrationsService.getMigrationsStatusAsync());
  } catch (err) {
    log.error(`Error while getting migrations:  ${err.message}`);
    next(err);
  }
});

router.post('/up', async function(req, res, next) {
    log.info('migrations-route', 'get history has been called');
    try {
      res.json(await migrationsService.upAsync());
    } catch (err) {
      console.error(`Error while getting migrations history `, err.message);
      next(err);
    }
  });

router.post('/down', async function(req, res, next) {
    try {
        res.json(await migrationsService.downAsync());
    } catch (err) {
        console.error(`Error while applying migration `, err.message);
        next(err);
    }
});

module.exports = router;