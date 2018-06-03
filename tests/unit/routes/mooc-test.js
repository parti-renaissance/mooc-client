import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

module('Unit | Route | mooc', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:mooc');
    assert.ok(route);
  });

  test('it makes the expected store lookup in the model hook', function() {
    this.mock(this.owner.lookup('service:store'))
      .expects('findRecord')
      .withArgs('mooc', 'mooc-slug');

    let route = this.owner.lookup('route:mooc');
    route.model({mooc: 'mooc-slug'});
  });
});
