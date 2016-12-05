import { Model as ProfileFollowersHistoryModel } from './profile-followers-history.model';
import Context from './../../config/context';


export default class ProfileFollowersHistoryBL {
  constructor( context ) {
    if ( !context ) {
      context = Context.instance();
    }
    this.logger = context.logger;
  }

  removeByProfileId( profileId) {

  }

  create() {

  }

}

