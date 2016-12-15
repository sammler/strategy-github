import Context from './../src/api/config/context';

export default class Global {
  constructor() {
    process.env.NODE_ENV = 'test';
    this.Context = Context.instance();
  }
}
