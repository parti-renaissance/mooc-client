import Route from '@ember/routing/route';
import { debounce } from '@ember/runloop';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';
import { schedule } from '@ember/runloop';

function measure(controller) {
  let width = window.innerWidth;
  if (width >= 1300) {
    controller.set('size', 500);
  } else {
    controller.set('size', 350);
  }
}

export default Route.extend({
  head: inject('head-data'),
  fastboot: inject(),
  isFastBoot: reads('fastboot.isFastBoot'),

  title(tokens = []) {
    let prefix;
    if (tokens.length) {
      prefix = `${tokens[0]}, ${this.currentModel.get('title')}`;
    } else {
      prefix = this.currentModel.get('title');
    }
    return `${prefix}, MOOC de La République En Marche !`;
  },

  model({ mooc }) {
    return this.store.findRecord('mooc', mooc);
  },
  setupController(controller, model) {
    this._super(controller, model);
    if (typeof FastBoot === 'undefined') {
      window.addEventListener('resize',() => debounce(this, measure, controller, 150));
      measure(controller);
    }
  },
  afterModel(model) {
    this._super(...arguments);
    let url;

    if (this.get('isFastBoot')) {
      let { host, path } = this.get('fastboot.request').getProperties('host', 'path');
      url = `https://${host}${path}`;
    } else {
      url = window.location.toString();
    }

    this.get('head').setProperties({
      url,
      moocTitle: model.get('title')
    });
  },

  actions: {
    didTransition() {
      let firstPage = this.get('firstPage');

      if (!firstPage) {
        schedule('afterRender', () => {
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'pageView',
            });
          }
        });
      } else {
        this.set('firstPage', false);
      }

      if (!this.get('isFastBoot')) {
        schedule('afterRender', () => {
          document.querySelector('.bm-content').scrollTo(0, 0);
        });
      }
    }
  }

});
