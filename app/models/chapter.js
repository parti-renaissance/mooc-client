import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  title: DS.attr('string'),
  slug: DS.attr('string'),
  videoId: DS.attr('string'),
  duration: DS.attr('string'),
  content: DS.attr('string'),
  links: DS.attr(),
  attachments: DS.attr(),
  typeformEmbed: DS.attr('string')
});
