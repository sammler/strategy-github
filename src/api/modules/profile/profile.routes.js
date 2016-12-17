import {Router} from 'express';
import ProfileController from './profile.controller';

export function routes() {
  const routes = Router();
  const profileController = new ProfileController();

  routes.get('/', profileController.get);
  routes.post('/', profileController.create);

  return routes;
}
