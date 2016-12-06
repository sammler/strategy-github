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
      } )
      .exec();
  }

  remove( userId ) {
    return UserModel
      .remove( { id: userId } )
      .exec()
  }

  removeAll() {
    return UserModel
      .remove( {} )
      .exec();
  }

  getById( userId ) {
    return UserModel
      .findOne( { id: userId } )
      .exec();
  }

  getByLogin( login ) {
    return UserModel
      .findOne( { login: login } )
      .exec();
  }

}
