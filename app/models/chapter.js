import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  type: DS.attr('string'),
  title: DS.attr('string'),
  slug: DS.attr('string'),
  content: DS.attr('string'),
  links: DS.attr(),
  attachments: DS.attr(),

  youtubeId: DS.attr('string'),
  youtubeThumbnail: DS.attr('string'),
  duration: DS.attr('string'),

  typeformEmbed: DS.attr('string'),

  week: DS.belongsTo('week'),

  nextChapter: computed('week.chapters', function() {
    let chapters = this.get('week.chapters');
    let position = chapters.indexOf(this);
    let next = chapters.objectAt(position + 1);
    if (!next) { // try first chapter of following week
      let nextWeek = this.get('week.nextWeek');
      return nextWeek ? nextWeek.get('chapters.firstObject') : null;
    } else {
      return next;
    }
  }),
  previousChapter: computed('week.chapters', function() {
    let chapters = this.get('week.chapters');
    let position = chapters.indexOf(this);
    let prev = chapters.objectAt(position - 1);
    if (!prev) { // try last chapter of previous week
      let prevWeek = this.get('week.previousWeek');
      return prevWeek ? prevWeek.get('chapters.lastObject') : null;
    } else {
      return prev;
    }
  }),
});
