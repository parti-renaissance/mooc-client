import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: 'article',
  classNames: ['chapter-ui'],

  router: inject(),

  next() {
    let nextChapter = this.chapter.get('nextChapter');
    let route = nextChapter.get('type') === 'mooc' ? 'mooc' : 'mooc.chapter';
    this.router.transitionTo(route, nextChapter.get('slug'));
  },

  previous() {
    let previousChapter = this.chapter.get('previousChapter');
    let route = previousChapter.get('type') === 'mooc' ? 'mooc' : 'mooc.chapter';
    this.router.transitionTo(route, previousChapter.get('slug'));
  }
});
