export function initialize(app) {
  app.register('load:first', true, {instantiate: false});
  app.inject('route', 'firstPage', 'load:first');
}

export default {
  initialize
};
