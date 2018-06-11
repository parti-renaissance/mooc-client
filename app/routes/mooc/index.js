import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let mooc = this.modelFor('mooc');
    let firstWeek = mooc.get('weeks.firstObject');
    let firstChapter = firstWeek.get('chapters.firstObject');
    this.transitionTo('mooc.chapter', firstChapter.get('slug'));
  }
});
