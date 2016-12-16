// import { Model as profileModel } from './profile.model';
import HttpStatus from 'http-status';
import ProfileBL from './profile.bl';

export default class ProfileController {
  constructor(context) {
    this.profileBL = new ProfileBL(context);
  }

  /**
   * Create a profile.
   * @param req
   * @param res
   * @param next
   */
  create(req, res, next) {
    console.log('controller:req.body', req.body);
    this.profileBL.save(req.body, (err, doc) => {
      if (err) { return next(err); }
      return res.status(200).json(doc);
    });
  }

  /**
   * Return all profiles
   */
  get(req, res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED);
  }

  /**
   * Return the profile by the GitHub Id
   * @param req
   * @param res
   * @param next
   */
  getById(req, res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED);
  }

  /**
   * Return the profile by the GitHub login.
   * @param req
   * @param res
   * @param next
   */
  getByLogin(req, res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED);
  }

  remove(req, res) {
    return res.status(HttpStatus.NOT_IMPLEMENTED);
  }

}
