import Route from '@ember/routing/route';

export default Route.extend({
  model({ mooc }) {
    return this.store.findRecord('mooc', mooc);
  }
});
