import { Router } from 'express';
import HealthController from './health.controller';

export function routes() {
  let routes = Router();

  routes.get( '/', new HealthController().get );

  return routes;
}
