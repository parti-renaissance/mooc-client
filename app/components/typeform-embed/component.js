import Component from '@ember/component';
import typeformEmbed from 'typeform';

export default Component.extend({
  classNames: ['typeform-embed'],

  insertWidget() {
    this._super(...arguments);
    let url = this.url || "https://admin.typeform.com/to/cVa5IG";
    if (!url) {
      return;
    }
    typeformEmbed.makeWidget(this.element, url, {
      hideFooter: true,
      hideHeaders: true,
      opacity: 0
    });
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.insertWidget();
  },

  didInsertElement() {
    this._super(...arguments);
    this.insertWidget();
  },

});
