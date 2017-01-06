const ghLib = require('./../../src/api/helper/github-utils');

describe('github-utils', () => {
  it('should have a function ghClient', () => {
    expect(ghLib).to.have.a.property('getGhClient').to.be.a.function;
  });

  it('should have a function ghClient', () => {
    expect(ghLib).to.have.a.property('getAll').to.be.a.function;
  });
});
