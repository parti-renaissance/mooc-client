import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | navigate-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);

    this.set('chapter', {
      previousChapter: {
        type: 'video'
      },
      nextChapter: {
        type: 'quiz'
      },
    });
    this.set('action', () => assert.ok('action called'));

    await render(hbs`{{navigate-button 'previous' chapter action=action}}`);

    assert.ok(find('.navigate-button'));
    assert.equal(find('.navigate-button').textContent.trim(), 'Retour');
    await click('.navigate-button');

    await render(hbs`{{navigate-button 'next' chapter action=action}}`);
    assert.equal(find('.navigate-button').textContent.trim(), 'Continuer');
    await click('.navigate-button');
  });
});
