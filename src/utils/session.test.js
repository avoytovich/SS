import AuthSession from 'utils/session';
import {SESSION_KEY} from 'constants/common';
import Storage from './storage';

describe('session tests', () => {
  const sessionKey = SESSION_KEY;
  const mockToken = 'token';
  beforeEach(() => {
    localStorage.clear();
  });

  it('should token exist', () => {
    Storage.set(sessionKey, mockToken);

    expect(AuthSession.isTokenSet()).toEqual(true);
  });

  it('should set header and save to storage', () => {
    AuthSession.set(mockToken);

    expect(Storage.get(sessionKey)).toEqual(mockToken);
  });

  it('should set header and save to storage', () => {
    AuthSession.remove();
    expect(Storage.get(sessionKey)).toEqual(null);
  });
});
