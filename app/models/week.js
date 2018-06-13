import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  publishedAt: DS.attr('date'),

  chapters: DS.hasMany('chapter'),
  mooc: DS.belongsTo('mooc'),

  nextWeek: computed('mooc.weeks', function() {
    let weeks = this.get('mooc.weeks');
    if (!weeks) {
      return null;
    }
    let position = weeks.indexOf(this);
    return weeks.objectAt(position + 1);
  }),
  previousWeek: computed('mooc.weeks', function() {
    let weeks = this.get('mooc.weeks');
    if (!weeks) {
      return null;
    }
    let position = weeks.indexOf(this);
    return weeks.objectAt(position - 1);
  }),
});
