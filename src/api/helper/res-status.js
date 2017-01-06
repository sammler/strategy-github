const HttpStatus = require('http-status');

export default function json(res, obj) {
  return res.status(HttpStatus.ACCEPTED, obj.toJSON());
}
