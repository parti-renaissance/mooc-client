import Component from '@ember/component';
import { computed, get } from '@ember/object';
import moment from 'moment';
import { htmlSafe } from '@ember/string';

const Item = Component.extend({
  tagName: '',
  route: 'mooc.chapter',

  parsedYtThumb: computed('chapter.youtubeThumbnail', function() {
    return htmlSafe(`background-image: url(${this.chapter.youtubeThumbnail})`);
  }),

  parsedDuration: computed('chapter.duration', function() {
    let duration = moment.duration(get(this, 'chapter.duration'));
    let [hours, minutes, seconds] = [duration.hours(), duration.minutes(), duration.seconds()];

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  })
});

Item.reopenClass({
  positionalParams: ['chapter']
})

export default Item;
