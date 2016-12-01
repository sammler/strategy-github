import { Router } from 'express';

export function routes() {
  let routes = Router();

  routes.get( '/', ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( { ts: new Date().toJSON() } );
  } );

  return routes;
}
