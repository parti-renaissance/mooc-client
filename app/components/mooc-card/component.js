import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  weeks: computed('item.chapterCount', function() {
    if (!this.item) {
      return;
    }
    let { chapterCount } = this.item;
    if (chapterCount === 1) {
      return '1 semaine';
    } else {
      return `${chapterCount} semaines`;
    }
  })
});
