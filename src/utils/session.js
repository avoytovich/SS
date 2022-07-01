import {SESSION_KEY} from 'constants/common';

import Storage from './storage';

class AuthSession {
  static sessionKey = SESSION_KEY;

  static isTokenSet() {
    const authToken = Storage.get(AuthSession.sessionKey);
    return authToken && !!authToken.trim();
  }

  static get() {
    return Storage.get(AuthSession.sessionKey);
  }

  static set(tokenValue) {
    Storage.set(AuthSession.sessionKey, tokenValue);
  }

  static remove() {
    Storage.remove(AuthSession.sessionKey);
  }
}

export default AuthSession;
