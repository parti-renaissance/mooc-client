import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import moocFixture from '../../mirage/fixtures/mooc';

module('Acceptance | main', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('main flow', async function(assert) {
    await visit('/mooc');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[1].slug}`, 'should redirect to first chapter');

    await click('.chapter-list li:nth-child(2) a');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[2].slug}`);

    await click('.next-button');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[3].slug}`);

    await click('.previous-button');

    assert.equal(currentURL(), `/mooc/${moocFixture.elements[2].slug}`);
  });
});
