import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{share-button}}`);

    assert.ok(find('.share-button'));
    assert.equal(findAll('.share-button__share').length, 3, 'all share buttons render');
  });
});
