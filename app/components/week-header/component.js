import Component from '@ember/component';

const WeekHeader = Component.extend({
  classNames: ['week-header']
});

WeekHeader.reopenClass({
  positionalParams: ['week']
});

export default WeekHeader;
