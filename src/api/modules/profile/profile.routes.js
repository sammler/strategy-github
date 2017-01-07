const express = require('express');
const ProfileController = require('./profile.controller');

export function routes() {
  const router = express.Router(); // eslint-disable-line new-cap
  const profileController = new ProfileController();

  router.get('/', profileController.get);
  router.post('/', profileController.create);

  return router;
}
