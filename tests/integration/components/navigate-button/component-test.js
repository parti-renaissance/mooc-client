import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | navigate-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('chapter', {
      previousChapter: {
        type: 'video'
      },
      nextChapter: {
        type: 'quiz'
      }
    });
    await render(hbs`{{navigate-button 'previous' chapter}}`);

    assert.ok(find('.navigate-button'));
    assert.equal(find('.navigate-button').textContent.trim(), 'Video précédant');

    await render(hbs`{{navigate-button 'next' chapter}}`);
    assert.equal(find('.navigate-button').textContent.trim(), 'Quiz suivant');
  });
});
