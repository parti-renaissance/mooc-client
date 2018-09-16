import Component from '@ember/component';

export default Component.extend({
  classNames: ['grid-layout'],
  classNameBindings: ['items.length::grid-layout--empty'],
});
