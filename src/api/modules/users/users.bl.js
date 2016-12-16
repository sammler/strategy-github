import { Model as UserModel } from './users.model';
import Context from './../../config/context';

export default class UsersBL {
  constructor(context) {
    if (!context) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }


  static save(data) {
    const query = { id: data.id };
    const User = new UserModel(data);
    const error = User.validateSync();
    if (error && error.errors) {
      return Promise.reject(error);
    }

    return UserModel
      .findOneAndUpdate(query, data, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true,
      })
      .exec();
  }

  static remove(userId) {
    return UserModel
      .remove({ id: userId })
      .exec();
  }

  static removeAll() {
    return UserModel
      .remove({})
      .exec();
  }

  static getById(userId) {
    return UserModel
      .findOne({ id: userId })
      .exec();
  }

  getByLogin(login) {
    return UserModel
      .findOne({ login })
      .exec();
  }

}
