import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

const SERVICE_MAP = {
  facebook: {
    base: 'https://www.facebook.com/sharer.php',
    getParams(url) {
      return `u=${url}`;
    }
  },
  twitter: {
    base: 'https://twitter.com/intent/tweet',
    getParams(url, {text, via}) {
      let params = `text=${text}&url=${url}`;
      params = via ? `${params}&via=${via}` : params;
      return params;
    }
  },
  email: {
    base: 'mailto:',
    getParams(url, {text, body}) {
      return `subject=${text || ''}&body=${body}`;
    }
  }
};


const Button = Component.extend({
  tagName: '',
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  init() {
    this._super(...arguments);
    if (!this.service) {
      return;
    }
    let url;
    if (this.get('isFastBoot')) {
      let { protocol, host, path } = this.get('fastboot.request').getProperties('protocol', 'host', 'path');
      url = `${protocol}//${host}${path}`;
    } else if (this.shareUrl) {
      url = this.shareUrl;
    } else {
      url = window.location.toString();
    }
    let params = this.params;
    let queryString = SERVICE_MAP[this.service].getParams(url, params);
    this.set('url', `${SERVICE_MAP[this.service].base}?${queryString}`);
  },

  getPopupPosition() {
    const dualScreenLeft = screen.availLeft;
    const dualScreenTop = screen.availTop;

    const windowWidth = screen.availWidth;
    const windowheight =  screen.availHeight;

    const left = ((windowWidth / 2) - (600 / 2)) + dualScreenLeft;
    const top = ((windowheight / 2) - (600 / 2)) + dualScreenTop;

    return {left: left, top: top};
  },

  actions: {
    openShare(url) {
      if (!url) {
        return;
      }
      let popupPosition = this.getPopupPosition();
      var newWindow = window.open(url, 'share window',
      'location=no,toolbar=no,menubar=no,scrollbars=no,status=no, width=600, height=600, top=' + popupPosition.top + ', left=' + popupPosition.left);

      if (typeof(newWindow) !== 'undefined' && newWindow !== null && newWindow.focus) {
        newWindow.focus();
      }
    }
  }
});

Button.reopenClass({
  positionalParams: ['service', 'icon']
});

export default Button;
