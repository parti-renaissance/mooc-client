import DS from 'ember-data';
import fetch from 'fetch';
import config from '../config/environment';

export default DS.Adapter.extend({
  findAll() {
    return fetch(config.moocAPI).then(r => r.json());
  },
  findRecord(store, type, slug) {
    return fetch(`${config.moocAPI}/${slug}`).then(r => r.json());
  }
});
