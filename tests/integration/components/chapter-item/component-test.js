import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | chapter-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let chapter = {
      title: 'Foo',
      duration: '00:30:15',
      youtubeThumbnail: 'https://img.youtube.com/vi/ktHEfEDhscU/0.jpg',
      type: 'video'
    };

    this.set('chapter', chapter);
    await render(hbs`{{chapter-item chapter}}`);

    assert.ok(find('.chapter-item'));
    assert.equal(find('.chapter-item__title').textContent.trim(), 'Foo', 'title');
    assert.equal(find('.chapter-item__duration').textContent.trim(), '30:15', 'duration');
    assert.equal(find('.chapter-item__yt-thumb').getAttribute('style'), `background-image: url(${chapter.youtubeThumbnail})`, 'thumbnail');

    set(chapter, 'duration', '01:02:01');
    await render(hbs`{{chapter-item chapter}}`);
    assert.equal(find('.chapter-item__duration').textContent.trim(), '1:02:01', 'duration');

    delete chapter.youtubeThumbnail;
    set(chapter, 'type', 'quiz');
    await render(hbs`{{chapter-item chapter}}`);
    assert.ok(find('.chapter-item__quiz-thumb .fa-check'), 'renders checkmark icon');
  });
});
