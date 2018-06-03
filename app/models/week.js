import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  publishedAt: DS.attr('date'),

  chapters: DS.hasMany('chapter')
});
