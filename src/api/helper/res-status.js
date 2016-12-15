import HttpStatus from 'http-status';

export function json( res, obj ) {
  return res.status(HttpStatus.ACCEPTED, obj.toJSON() );
}
