import { routes as healthRoutes }  from './modules/health/health.routes';
import { routes as profileRoutes } from './modules/profile/profile.routes';

export function config( app ) {

  app.use( '/health', healthRoutes() );
  app.use( '/profile', profileRoutes() );

}
