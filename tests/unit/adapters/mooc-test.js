import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import * as fetch from 'fetch';
import config from '../../../config/environment';

module('Unit | Adapter | mooc', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:mooc');
    assert.ok(adapter);
  });

  test('it calls fetch with the expected params', function() {
    this.mock(fetch)
      .expects('default')
      .once()
      .withArgs(`${config.moocAPI}/foo`)
      .resolves({json() {}});
    let adapter = this.owner.lookup('adapter:mooc');
    adapter.findRecord(null, null, 'foo');
  });
});
