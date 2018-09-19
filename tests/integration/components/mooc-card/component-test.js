import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mooc-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('item', {});
    await render(hbs`{{mooc-card item=item}}`);

    assert.ok(this.element.querySelector('.mooc-card'));
  });
});
