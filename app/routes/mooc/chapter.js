import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Route.extend({
  head: inject('head-data'),
  fastboot: inject(),
  isFastBoot: reads('fastboot.isFastBoot'),

  titleToken: model => model.get('title'),

  model({ chapter }) {
    return this.store.peekRecord('chapter', chapter);
  },

  afterModel(model) {
    this._super(...arguments);

    this.get('head').setProperties({
      chapterTitle: model.get('title'),
      image: model.get('youtubeThumbnail')
    });
  }
});
