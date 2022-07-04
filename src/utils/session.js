import {SESSION_KEY} from 'constants/common';

import ClientStorage from './clientStorage';

class ClientSession extends ClientStorage {
  constructor() {
    super();
    this.sessionKey = SESSION_KEY;
  }

  isTokenSet() {
    const authToken = this.get();
    return authToken && !!authToken.trim();
  }
}

const Session = new ClientSession();

export default Session;
