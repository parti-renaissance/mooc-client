import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Route.extend({
  head: inject('head-data'),
  fastboot: inject(),
  isFastBoot: reads('fastboot.isFastBoot'),

  afterModel() {
    let url;

    if (this.get('isFastBoot')) {
      let { host, path } = this.get('fastboot.request').getProperties('host', 'path');
      url = `https://${host}${path}`;
    } else {
      url = window.location.toString();
    }

    this.head.set('url', url);

  }
});
