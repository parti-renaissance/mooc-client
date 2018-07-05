import Component from '@ember/component';
import $ from 'jquery';

const ChapterList = Component.extend({
  classNames: ['chapter-list'],

  didRender() {
    this._super(...arguments);

    const $menu = $('.bm-menu');
    const $item = $('.chapter-item.active');

     if (!$menu.data('disableAutoScroll') && $item.length) {
       $menu
         .data('disableAutoScroll', true)
         .animate({ scrollTop:$item.position().top }, 'slow');
      }
    },
});

ChapterList.reopenClass({
  positionalParams: ['chapters'],
});

export default ChapterList;
