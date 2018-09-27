import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

const META_DESCRIPTION = "Découvrez les MOOC de La République En Marche ! Entièrement gratuits, les MOOC (ou Massive Open Online Course) sont des cours accessibles en ligne créés par LaREM à destination de tous ceux qui veulent approfondir leurs compétences citoyennes.";

export default Route.extend({
  head: inject('head-data'),
  fastboot: inject(),
  isFastBoot: reads('fastboot.isFastBoot'),

  title() {
    return 'MOOC | La République En Marche !';
  },

  model() {
    return this.store.findAll('mooc');
  },

  afterModel() {
    this.head.setProperties({
      description: META_DESCRIPTION,
      chapterTitle: "MOOC de La République En Marche !",
      image: 'https://storage.googleapis.com/en-marche-fr/E-MAILING/2017/images/REM/Logo-LREM-noir.jpg'
    });

    if (this.isFastBoot) {
      let { protocol, host, path } = this.fastboot.request;
      this.set('url', `${protocol}//${host}${path}`);
    }
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
