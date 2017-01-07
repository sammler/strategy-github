const AppServer = require('./../../src/api/app-server');
const supertest = require('supertest');

describe('AppServer', () => {
  let appServer = null;
  beforeEach(() => {
    appServer = new AppServer();
  });

  it('should be a class', () => {
    expect(appServer).to.be.an.object;
  });

  it('should have a function start', () => {
    expect(appServer).to.have.a.property('start').to.be.a.function;
  });

  it('should have a function start', () => {
    expect(appServer).to.have.a.property('stop').to.be.a.function;
  });

  it('should have an object base', () => {
    expect(appServer).to.have.a.property('context').to.be.an.object;
  });

  it('base should have a logger', () => {
    expect(appServer.context).to.have.a.property('logger').to.be.an.object;
  });
});

describe('Loading AppServer', () => {
  let server;
  const appServer = new AppServer();
  beforeEach(() => appServer.start()
      .then(() => {
        server = supertest(appServer.server);
      }));
  afterEach(() => appServer.stop());

  it('responds with 404 to /', () => server
      .get('/')
      .expect(404));
});
