import Component from '@ember/component';

const Item = Component.extend({
  tagName: ''
});

Item.reopenClass({
  positionalParams: ['chapter']
})

export default Item;
