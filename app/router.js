import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('mooc', {path: ':mooc'}, function() {
    this.route('chapter', {path: ':chapter'});
  });
});

export default Router;
