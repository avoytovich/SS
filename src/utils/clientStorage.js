import Cookies from 'js-cookies';

import {PREFIX_KEY} from 'constants/common';

import Storage from './storage';

class ClientStorage {
  prefix = PREFIX_KEY;

  constructor() {
    this.sessionKey = '';

    if ('localStorage' in window && window.localStorage !== null) {
      this.storage = new Storage();
    } else {
      this.storage = new Cookies();
    }
  }

  keyValue(key) {
    return `${this.prefix}-${key || this.sessionKey}`;
  }

  get(key) {
    return this.storage.get(this.keyValue(key));
  }

  set(key, value) {
    if (arguments.length === 1) {
      value = key;
      key = '';
    }
    this.storage.set(this.keyValue(key), value);
  }

  remove(key) {
    this.storage.remove(this.keyValue(key));
  }
}

export default ClientStorage;
