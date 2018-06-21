import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  content: DS.attr('string'),
  youtubeDuration: DS.attr('string'),
  youtubeId: DS.attr('string'),
  youtubeThumbnail: DS.attr('string'),

  shareEmailSubject: DS.attr('string'),
  shareEmailBody: DS.attr('string'),
  shareTwitterText: DS.attr('string'),
  shareFacebookText: DS.attr('string'),


  type: DS.attr('string', {defaultValue: 'mooc'}),

  weeks: DS.hasMany('week'),

  nextChapter: computed('weeks', function() {
    let week = this.weeks.firstObject;
    return week.chapters.firstObject;
  })
});
