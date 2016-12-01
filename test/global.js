import Context from './../src/context';

export default class Global {
  constructor() {
    process.env.NODE_ENV = 'test';
    this.Context = new Context();
  }
}
