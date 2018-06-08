import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chapter-ui', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chapter', {
      type: "chapter",
      title: "Semaine 1 : Le coup de fourchette pour détendre notre santé",
      slug: "semaine-1-le-coup-de-fourchette-pour-detendre-notre-sante",
      publishedAt: "2018-06-09 09:30:00"
    });

    await render(hbs`{{chapter-ui chapter=chapter}}`);

    assert.ok(find('.chapter-ui'));
  });
});
