import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | mooc', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('mooc');

    assert.ok(serializer);
  });

  test('it normalizes a combined response', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('mooc');
    let response = {
      elements: [{
        type: 'chapter',
        slug: 'week-one',
        title: 'Week One'
      }, {
        slug: 'chapter-one'
      }, {
        slug: 'chapter-two'
      }, {
        type: 'chapter',
        slug: 'week-two'
      }, {
        slug: 'chapter-three'
      }, {
        slug: 'chapter-four'
      }]
    };
    let jsonDoc = serializer.normalizeResponse(store, null, response, 'foo');

    assert.equal(jsonDoc.data.relationships.weeks.data.length, 2, 'weeks are split out');
    assert.equal(jsonDoc.included.length, 6, 'all elements wind up included');
  });
});
