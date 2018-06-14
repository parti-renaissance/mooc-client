import Component from '@ember/component';
import typeformEmbed from 'typeform';

export default Component.extend({
  classNames: ['typeform-embed'],

  didInsertElement() {
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
});
