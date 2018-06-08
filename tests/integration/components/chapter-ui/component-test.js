import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chapter-ui', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let chapter = {
      title: "Les produits transformés dans une première vidéo",
      slug: "les-produits-transformes-dans-une-premiere-video",
      content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
      links: [{
        linkName: "Les sites départementaux de La République En Marche",
        linkUrl: "http://dpt.en-marche.fr"
      }],
      attachments: [{
        attachmentName: "Bonsoir GitHub",
        attachmentUrl: "http://enmarche.dev:8000/mooc/file/af916a45-8cd2-4557-a8b8-83d2ebeb258c"
      }],
      youtubeId: "ktHEfEDhscU",
      youtubeThumbnail: "https://img.youtube.com/vi/ktHEfEDhscU/0.jpg",
      duration: "00:02:10",
      previousChapter: {},
      nextChapter: {}
    };

    assert.expect(12);
    this.set('chapter', chapter);

    await render(hbs`{{chapter-ui chapter=chapter}}`);

    assert.ok(find('.chapter-ui'), 'component renders');
    assert.equal(find('.chapter-video iframe').getAttribute('src'), `https://www.youtube.com/embed/${chapter.youtubeId}`, 'youtube iframe renders');

    delete chapter.youtubeId;
    chapter.typeformEmbed = '<p id="embed">foo</p>';

    this.set('next', () => assert.ok('called next'));
    this.set('previous', () => assert.ok('called previous'));
    await render(hbs`{{chapter-ui chapter=chapter next=next previous=previous}}`);
    
    assert.equal(find('#embed').textContent.trim(), 'foo', 'typeform embed renders');

    assert.ok(find('.chapter-controls__center .share-button .email'), 'share via email');
    assert.ok(find('.chapter-controls__center .share-button .twitter'), 'share via twitter');
    assert.ok(find('.chapter-controls__center .share-button .facebook'), 'share via facebook');

    assert.equal(find('.chapter-title').textContent.trim(), chapter.title, 'chapter title');
    assert.equal(find('.chapter-description').innerHTML.trim(), chapter.content, 'chapter description');

    assert.equal(findAll('.chapter-links li').length, chapter.links.length, 'links');
    assert.equal(findAll('.chapter-attachments li').length, chapter.links.length, 'attachments');

    await click('.previous-button');
    await click('.next-button');
  });
});
