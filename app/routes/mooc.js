import Route from '@ember/routing/route';
import { debounce } from '@ember/runloop';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';
import { schedule } from '@ember/runloop';

const META_DESCRIPTION = title => `Ce chapitre est l'un des éléments du cours ${title}, un MOOC gratuit et accessible à tous, proposé par La République En Marche !`;

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

    this.head.setProperties({
      moocTitle: model.get('title'),
      description: META_DESCRIPTION(model.title),
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
