import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chapter-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chapter', {
      title: 'Foo',
      duration: '3:00'
    })
    await render(hbs`{{chapter-item chapter}}`);

    assert.ok(find('.chapter-item'));
    assert.equal(find('.chapter-item__title').textContent.trim(), 'Foo');
    assert.equal(find('.chapter-item__duration').textContent.trim(), '3:00');
  });
});
