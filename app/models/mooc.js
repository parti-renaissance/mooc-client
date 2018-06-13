import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),

  weeks: DS.hasMany('week')
});
