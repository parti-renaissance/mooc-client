import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cookie-banner', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    document.cookie = 'cookieconsent_status=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  test('it renders', async function(assert) {
    await render(hbs`{{cookie-banner}}`);

    assert.ok(this.element.querySelector('.cookie-banner'), 'renders');
  });

  test('it does not render if the cookieconsent_status is set to dismissed', async function(assert) {
    document.cookie = 'cookieconsent_status=dismissed;';

    await render(hbs`{{cookie-banner}}`);
    assert.notOk(this.element.querySelector('.cookie-banner'), 'should be closed if cookie is set');
  });

  test('dismissing should set the cookie', async function(assert) {
    await render(hbs`{{cookie-banner}}`);
    await click('[data-test-selector="cookie-button"]');

    assert.ok(document.cookie.match('cookieconsent_status'), 'cookie should be set');
  });
});
