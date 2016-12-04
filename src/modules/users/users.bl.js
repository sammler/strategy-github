import { Model as UserModel } from './users.model';
import Context from './../../config/context';

export default class UsersBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  save( data ) {

    let query = { id: data.id };
    let User = new UserModel( data );
    let error = User.validateSync();
    if ( error && error.errors ) {
      return Promise.reject( error );
    }

    return UserModel
      .findOneAndUpdate( query, data, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true
      } );
  }

  remove( userId ) {

  }

  removeAll() {
    return UserModel
      .remove( {} )
      .exec();
  }

  getByName( userName ) {

  }

  getById( userId) {

  }

}
