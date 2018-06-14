import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | flyout-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{flyout-menu}}`);

    assert.ok(find('.flyout-menu'));

    // Template block usage:
    await render(hbs`
      {{#flyout-menu as |flyout|}}
        {{#flyout.trigger}}
          Open
        {{/flyout.trigger}}

        {{#flyout.content}}
          Foo
        {{/flyout.content}}
      {{/flyout-menu}}
    `);

    await click('.flyout-menu__trigger');

    assert.equal(find('.flyout-menu__content').textContent.trim(), 'Foo');
  });
});
