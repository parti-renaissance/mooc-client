import Route from '@ember/routing/route';
import { debounce } from '@ember/runloop';

function measure(controller) {
  let width = window.innerWidth;
  if (width >= 1300) {
    controller.set('size', 500);
  } else {
    controller.set('size', 350);
  }
}

export default Route.extend({
  model({ mooc }) {
    return this.store.findRecord('mooc', mooc);
  },
  setupController(controller, model) {
    this._super(controller, model);
    window.addEventListener('resize',() => debounce(this, measure, controller, 150));
    measure(controller);
  },

});
