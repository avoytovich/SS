import React, {useState, useEffect, useCallback, useContext} from 'react';
import * as msal from '@azure/msal-browser';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

// import {setAuthUser} from 'store/auth';
import AuthSession from 'utils/session';
import {INIT_PAGE} from 'constants/common';
import Storage from 'utils/storage';

const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;

export const MsalContext = React.createContext();
export const useMsal = () => useContext(MsalContext);

export const MsalProvider = ({children, config}) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState();
  // eslint-disable-next-line no-unused-vars
  const [initialPath, setInitialPath] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [publicClient, setPublicClient] = useState();
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (!Storage.get(INIT_PAGE)) {
      Storage.set(INIT_PAGE, window.location.pathname);
    }

    const pc = new msal.PublicClientApplication(config);
    setPublicClient(pc);

    pc.handleRedirectPromise()
      .then(response => {
        setLoading(false);
        if (response) {
          const usr = pc.getAccountByUsername(response?.account?.username);
          setUser(usr);
          // dispatch(setAuthUser(usr));

          if (response.accessToken) {
            AuthSession.set(response.accessToken);
            setToken(response.accessToken);
            const path = Storage.get(INIT_PAGE);
            setInitialPath(path);
            Storage.set(INIT_PAGE, null);
            setIsAuthenticated(true);
          }
        } else {
          pc.loginRedirect();
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
        setLoginError(error);
      });

    if (pc.getAccountByUsername()) {
      const usr = pc.getAccountByUsername();
      setUser(usr);
      //  dispatch(setAuthUser(usr));
      setIsAuthenticated(true);
    }
  }, [config, dispatch]);

  const login = useCallback(
    conf => {
      publicClient.loginRedirect(conf);
    },
    [publicClient]
  );

  const logout = () => {
    publicClient.logout();
  };

  const getTokenPopup = async loginRequest => {
    try {
      const response = await publicClient.acquireTokenSilent(loginRequest);
      AuthSession.set(response.accessToken);
      setToken(response.accessToken);
    } catch (error) {
      try {
        setPopupOpen(true);

        const response = await publicClient.acquireTokenPopup(loginRequest);
        AuthSession.set(response.accessToken);
        setToken(response.accessToken);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        setLoginError(e);
      } finally {
        setPopupOpen(false);
      }
    }
  };

  const getTokenRedirect = async loginRequest => {
    try {
      const t = await publicClient.acquireTokenSilent(loginRequest);
      AuthSession.set(t);
      setToken(t);
    } catch (error) {
      try {
        setLoading(true);

        publicClient.acquireTokenRedirect(loginRequest);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        setLoginError(e);
      }
    }
  };

  const getToken = async (loginRequest, method) => {
    const signInType = isIE || isEdge ? 'loginRedirect' : method;
    if (signInType === 'loginRedirect') {
      return getTokenRedirect(loginRequest);
    }
    return getTokenPopup(loginRequest);
  };

  return (
    <MsalContext.Provider
      value={{
        pc: publicClient,
        isAuthenticated,
        user,
        token,
        loading,
        popupOpen,
        loginError,
        initialPath,
        login,
        logout,
        getToken
      }}
    >
      {isAuthenticated ? children : null}
    </MsalContext.Provider>
  );
};

MsalProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.shape({
    loginRequest: PropTypes.shape({})
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.shape({})
  })
};
