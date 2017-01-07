const UserStarredBL = require('./../../src/api/modules/user-starred/user-starred.bl');
const _ = require('lodash');

describe('user-starred.bl => ', () => {
  beforeEach(() => Promise.all([
    UserStarredBL.removeAll()
  ]));

  it('has some required methods', () => {
    expect(UserStarredBL).to.have.a.property('modelFromGitHub').to.be.a.method;
    expect(UserStarredBL).to.have.a.property('save').to.be.a.method;
    expect(UserStarredBL).to.have.a.property('saveSingle').to.be.a.method;
    expect(UserStarredBL).to.have.a.property('removeAll').to.be.a.method;
    expect(UserStarredBL).to.have.a.property('removeById').to.be.a.method;
    expect(UserStarredBL).to.have.a.property('removeByUser').to.be.a.method;
    expect(UserStarredBL).to.have.a.property('removeByUserAndRepo').to.be.a.method;
  });

  it('`save` saves a single item', () => {
    const userId = 1;
    const ghStarredItem = {
      id: 100,
      name: 'bar-implementation',
      full_name: 'foo/bar-implementation'
    };

    return UserStarredBL.save(userId, ghStarredItem)
      .then(result => {
        expect(result).to.exist;
        expect(result.upserted).to.be.of.length(1);
      });
  });

  xit('creates only one item per repo_id, user_id, date_from', () => {

  });

  it('creates multiple items', () => {
    const userId = 1;
    const ghStarredItem = {
      name: 'bar-implementation',
      full_name: 'foo/bar-implementation'
    };

    const promises = [];
    for (let i = 0; i < 100; i++) {
      const item = _.clone(ghStarredItem);
      item.id = i;
      promises.push(UserStarredBL.save.bind(null, userId, item));
    }

    return Promise.all(promises)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.of.length(100);
      });
  });

  it('`modelFromGitHub returns an object ready to insert`', () => {
    const userId = 1;
    const ghStarredItem = {
      id: 100,
      name: 'bar-implementation',
      full_name: 'foo/bar-implementation'
    };

    const newDoc = UserStarredBL.modelFromGitHub(userId, ghStarredItem);
    expect(newDoc).to.exist;
    expect(newDoc).to.have.a.property('user_id').to.be.equal(userId);
    expect(newDoc).to.have.a.property('repo_id').to.be.equal(ghStarredItem.id);
  });
});
