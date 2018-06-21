import { helper } from '@ember/component/helper';

export function encode([ text ]/*, hash*/) {
  return encodeURIComponent(text);
}

export default helper(encode);
