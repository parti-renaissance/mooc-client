import Component from '@ember/component';

export default Component.extend({
  classNames: ['flyout-menu'],

  calculatePosition(trigger, content) {
    let { height: contentHeight } = content.getBoundingClientRect();
    let style = {
      left: 0,
      top:  -contentHeight - 13
    };

    return { style };
  }
});
