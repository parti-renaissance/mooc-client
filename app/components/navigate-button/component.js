import Component from '@ember/component';

const Button = Component.extend({
  tagName: 'button',
  classNames: ['navigate-button']
});

Button.reopenClass({
  positionalParams: ['type', 'chapter']
});

export default Button;
