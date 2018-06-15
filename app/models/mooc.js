import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  content: DS.attr('string'),
  youtubeDuration: DS.attr('string'),
  youtubeId: DS.attr('string'),
  youtubeThumbnail: DS.attr('string'),

  type: DS.attr('string', {defaultValue: 'mooc'}),

  weeks: DS.hasMany('week')
});
