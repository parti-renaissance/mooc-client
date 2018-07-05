import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  shouldOpen: false,

  init() {
    this._super(...arguments);
    if (typeof document !== 'undefined' && !document.cookie.match('cookieconsent_status')) {
      this.set('shouldOpen', true);
    }
  },


  actions: {
    dismiss() {
      this.set('shouldOpen', false);
      let date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      document.cookie = `cookieconsent_status=dismissed; expires=${date.toString()}`;
    }
  }
});
