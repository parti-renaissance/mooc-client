import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  partial: computed('icon', function() {
    if (!this.icon) {
      return;
    }
    return `components/svg-icon/${this.icon}`;
  })
});
