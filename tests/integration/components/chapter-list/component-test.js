import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chapter-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chapters', [1, 2, 3])
    await render(hbs`{{chapter-list chapters}}`);

    assert.ok(find('.chapter-list'));
    assert.equal(findAll('.chapter-item').length, 3);
  });
});
