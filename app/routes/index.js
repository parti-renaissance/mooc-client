import Route from '@ember/routing/route';

export default Route.extend({
  title() {
    return 'MOOC | La République En Marche !';
  },

  model() {
    return this.store.findAll('mooc');
  },
  
  actions: {
    didTransition() {
      if (typeof FastBoot === 'undefined') {
        window.scrollTo(0, 0);
      }
    },

    willTransition() {
      window.scrollTo(0, 0);
    }
  }
});
