import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | chapter', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('chapter', {}));
    assert.ok(model);
  });

  test('it knows its siblings', function(assert) {
    let store = this.owner.lookup('service:store');
    run(() => {
      store.createRecord('week', {
        chapters: [
          store.createRecord('chapter', {title: 'chapter 1'}),
          store.createRecord('chapter', {title: 'chapter 2'}),
          store.createRecord('chapter', {title: 'chapter 3'}),
        ]
      })
    });
    let chapter2 = store.peekAll('chapter').findBy('title', 'chapter 2');
    let chapter3 = store.peekAll('chapter').findBy('title', 'chapter 3');

    assert.equal(chapter2.get('nextChapter').get('title'), 'chapter 3');
    assert.equal(chapter2.get('previousChapter').get('title'), 'chapter 1');
    assert.notOk(chapter3.get('nextChapter'), 'next chapter for final chapter is falsey')
  });
});
