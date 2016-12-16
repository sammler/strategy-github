import { routes as healthRoutes } from './modules/health/health.routes';
import { routes as profileRoutes } from './modules/profile/profile.routes';

export default function config(app) {
  app.use('/health-check', healthRoutes());
  app.use('/profiles', profileRoutes());
}
