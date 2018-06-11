import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | week-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let now = new Date();
    this.set('week', {
      title: 'Week 1',
      publishedAt: now,
      description: 'Week description'
    });
    await render(hbs`{{week-header week}}`);

    assert.ok(find('.week-header'));
    assert.equal(find('.week-date').textContent.trim(), moment(now).format('D MMM YYYY'));
  });
});
