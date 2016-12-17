import {Router} from 'express';
import HealthController from './health.controller';

export function routes() {
  const routes = Router();
  // let healthController = new HealthController();

  routes.get('/', HealthController.get);

  return routes;
}
