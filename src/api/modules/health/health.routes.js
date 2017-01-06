const express = require('express');
const HealthController = require('./health.controller');

export function routes() {
  const router = express.Router(); // eslint-disable-line new-cap
  // let healthController = new HealthController();

  router.get('/', HealthController.get);

  return router;
}
