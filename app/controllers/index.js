import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sorted: sort('model', (a, b) => a.get('title').localeCompare(b.get('title')))
});
