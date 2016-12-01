import { Router } from 'express';
import ProfileController from './profile.controller';

export function routes() {
  let routes = Router();
  let profileController = new ProfileController();

  routes.get( '/', profileController.get );

  return routes;
}
