import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

module('Unit | Route | mooc/chapter', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:mooc/chapter');
    assert.ok(route);
  });

  test('it makes the expected store lookup in the model hook', function() {
    this.mock(this.owner.lookup('service:store'))
      .expects('peekRecord')
      .withArgs('chapter', 'chapter-slug');

    let route = this.owner.lookup('route:mooc/chapter');
    route.model({chapter: 'chapter-slug'});
  });
});
