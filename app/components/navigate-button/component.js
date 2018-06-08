import Component from '@ember/component';

const Button = Component.extend({
  tagName: 'button',
  classNames: ['navigate-button'],

  click() {
    if (this.action) {
      this.action();
    }
  }
});

Button.reopenClass({
  positionalParams: ['type', 'chapter']
});

export default Button;
