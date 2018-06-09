import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'article',
  classNames: ['chapter-ui'],

  router: inject(),

  next() {
    this.router.transitionTo('mooc.chapter', this.chapter.nextChapter.slug);
  },

  previous() {
    this.router.transitionTo('mooc.chapter', this.chapter.previousChapter.slug);
  }
});
