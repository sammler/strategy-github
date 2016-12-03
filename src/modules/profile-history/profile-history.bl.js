import { Model as ProfileHistoryModel } from './profile-history.model';
import Context from './../../config/context';

export default class ProfileHistoryBL {
    constructor( context )
    {
      if ( !context ) {
        context = Context.instance();
      }
      this.logger = context.logger;
    }

}
