import { helper } from '@ember/component/helper';
import { capitalize as cap } from '@ember/string';

export function capitalize([ str ]/*, hash*/) {
  if (typeof str !== 'string') {
    return str;
  }
  return cap(str);
}

export default helper(capitalize);
