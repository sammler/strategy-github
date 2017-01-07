const UsersBL = require('./../../src/api/modules/users/users.bl');
const Context = require('./../../src/api/config/context');
const DBHelpers = require('./../lib/db-helpers');

xdescribe('users.bl', () => {
  let usersBL;
  let dbHelpers;
  let context;
  before(done => {
    context = Context.instance();
    usersBL = new UsersBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase(done);
  });
  beforeEach(() => {

  });
  after(() => {
    // context.dbDisconnect();
  });

  it('BL has some basic functions', () => {
    expect(usersBL).to.have.a.property('getById');
    expect(usersBL).to.have.a.property('getByLogin');
    expect(usersBL).to.have.a.property('save');
    expect(usersBL).to.have.a.property('remove');
    expect(usersBL).to.have.a.property('removeAll');
  });

  it('`removeAll` => removes all existing users', () => usersBL.removeAll());

  it('`save` => saves a new user (with defaults)', () => {
    const user = {
      id: 1,
      login: 'foo'
    };
    return usersBL
      .save(user)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.have.a.property('last_check');
        // Todo: Date conversion
        expect(result).to.have.a.property('last_check').to.be.equal(new Date(new Date().setUTCHours(0, 0, 0, 0)));
        expect(result).to.have.a.property('created_at');
        expect(result).to.have.a.property('updated_at');
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it('`remove` removes a user', () => {
    const user = {
      id: 1,
      login: 'foo'
    };

    return usersBL
      .removeAll()
      .then(() => usersBL.save(user))
      .then(() => usersBL.remove(user.id))
      .then(result => {
        expect(result).to.exist;
        expect(result.message.numberReturned).to.equal(1);
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it('`getById` returns an existing user', () => {
    const user = {
      id: 100,
      login: 'foo'
    };
    return usersBL
      .removeAll()
      .then(() => usersBL.save(user))
      .then(() => usersBL.getById(user.id))
      .then(result => {
        expect(result).to.exist;
        expect(result).to.have.a.property('id').to.be.equal(user.id);
      });
  });

  it('`getByLogin` returns the desired user', () => {
    const user = {
      id: 100,
      login: 'foo'
    };

    return usersBL
      .removeAll()
      .then(() => usersBL.save(user))
      .then(() => usersBL.getByLogin(user.login))
      .then(result => {
        expect(result).to.exist;
        // Todo: Research the _doc stuff
        expect(result).to.have.a.property('_doc');

        /* eslint-disable no-underscore-dangle */
        expect(result._doc).to.have.a.property('id').to.be.equal(user.id);
        expect(result._doc).to.have.a.property('login').to.be.equal(user.login);
        /* eslint-enable no-underscore-dangle */
      });
  });

  it('`save` => updates an existing user (and updates last_check)', () => {
    const user = {
      id: 1,
      login: 'foo',
      foo: 'bar',
      // eslint-disable-next-line no-mixed-operators
      last_check: new Date(new Date() - 24 * 60 * 60 * 1000).setUTCHours(0, 0, 0, 0)
    };

    const userUpdated = {
      id: 1,
      login: 'foo',
      foo: 'baz'
    };

    const expectedDate = new Date(new Date().setUTCHours(0, 0, 0, 0));

    return usersBL
      .removeAll()
      .then(() => usersBL.save(user))
      .then(() => usersBL.save(userUpdated))
      .then(result => {
        expect(result).to.exist;

        /* eslint-disable no-underscore-dangle */
        // Todo: Why not returning a model, do some research ...
        expect(result._doc).to.have.a.property('foo').to.be.equal('baz');
        expect(result._doc.last_check).to.be.equal(new Date(expectedDate));
        /* eslint-enable no-underscore-dangle */
      });
  });
});

