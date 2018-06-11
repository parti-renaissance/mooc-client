import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: inject(),

  setTitle(title) {
    this.get('headData').set('title', title);
  }
});

Router.map(function() {
  this.route('mooc', {path: ':mooc'}, function() {
    this.route('chapter', {path: ':chapter'});
  });
});

export default Router;
