import Component from '@ember/component';

const ChapterList = Component.extend({
  classNames: ['chapter-list']
});

ChapterList.reopenClass({
  positionalParams: ['chapters']
});

export default ChapterList;
