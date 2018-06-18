import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | share-button/share', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{share-button/share}}`);

    assert.ok(find('.share-button__share'));
  });

  test('facebook', async function() {
    let newWindow = {focus() {}};
    this.mock(newWindow).expects('focus');
    this.mock(window)
      .expects('open')
      .withArgs(`https://www.facebook.com/sharer.php?u=${window.location}`, 'share window')
      .returns(newWindow);

    await render(hbs`{{share-button/share 'facebook'}}`);
    await click('.share-button__share');
  });

  test('twitter', async function() {
    let newWindow = {focus() {}};
    this.mock(newWindow).expects('focus');
    this.mock(window)
      .expects('open')
      .withArgs(`https://twitter.com/intent/tweet?text=foo&url=${window.location}`, 'share window')
      .returns(newWindow);

    await render(hbs`{{share-button/share 'twitter' params=(hash text='foo')}}`);
    await click('.share-button__share');
  });

  test('email', async function(assert) {
    await render(hbs`{{share-button/share 'email' params=(hash subject='whatever' body='ok')}}`);

    assert.ok(find('.share-button__share'));
    assert.equal(find('.share-button__share.email').getAttribute('href'), 'mailto:?subject=whatever&body=ok');
  })
});
