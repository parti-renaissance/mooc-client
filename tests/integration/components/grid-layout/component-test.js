import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | grid-layout', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{grid-layout}}`);

    assert.ok(find('.grid-layout'));

    this.set('items', ['foo', 'bar', 'baz']);
    // Template block usage:
    await render(hbs`
      {{#grid-layout items=items as |item|}}
        {{item}}
      {{/grid-layout}}
    `);

    assert.equal(findAll('.grid-layout__cell').length, 3);
  });
});
