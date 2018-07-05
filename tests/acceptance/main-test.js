import { module, test } from 'qunit';
import { visit, currentURL, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import moocFixture from '../../mirage/fixtures/mooc';

module('Acceptance | main', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('main flow', async function(assert) {
    await visit('/mooc');

    assert.equal(find('.chapter-body').textContent.trim(), moocFixture.content.replace(/<[^>]+>/g, ''));
    assert.equal(find('.chapter-video > iframe').getAttribute('src'), `https://www.youtube.com/embed/${moocFixture.youtubeId}?rel=0&showinfo=0`);

    await click('.chapter-list li:nth-child(2) a');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[2].slug}`);

    await click('.next-button');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[3].slug}`);

    await click('.previous-button');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[2].slug}`);

    await click('.chapter-list li:nth-child(5) a');
    await click('.next-button');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[7].slug}`, 'can navigate forward across weeks');

    await click('.previous-button');
    assert.equal(currentURL(), `/mooc/${moocFixture.elements[5].slug}`, 'can navigate backward across weeks');
  });
});
