// See https://github.com/JedWatson/model-transform/blob/master/index.js
// Todo: potentially bind it to the schema
export function modelToJSON( doc, fn ) {
  let rtn = doc.toObject();
  delete rtn.__v;
  rtn.id_orig = rtn._id;
  delete rtn._id;
  if ( fn ) {
    let result = fn.call( doc, rtn, options );
    if ( result ) {
      rtn = result;
    }
  }

  return rtn;
}
