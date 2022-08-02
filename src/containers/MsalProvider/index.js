import React, {useState, useEffect, useCallback, useContext} from 'react';
import * as msal from '@azure/msal-browser';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {setAuthData, setProfilePhoto} from 'store/auth';
import Session from 'utils/session';
import {INIT_PAGE} from 'constants/common';

import {loginScope, graphConfig} from '../../constants/msalConfig-config';

const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;

export const MsalContext = React.createContext();
export const useMsal = () => useContext(MsalContext);

// TODO: REFACTOR this function.

function callMSGraph(endpoint, token, callback) {
  const bearer = `Bearer ${token}`;

  const options = {
    method: 'GET',
    headers: {'Content-Type': 'image/*', Authorization: bearer},
    responseType: 'arraybuffer'
  };

  fetch(endpoint, options)
    .then(response => response.arrayBuffer())
    .then(response => callback(response, endpoint))
    .catch(error => console.log(error));
}

export const MsalProvider = ({children, config}) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialPath, setInitialPath] = useState();
  const [publicClient, setPublicClient] = useState();
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (!Session.get(INIT_PAGE)) {
      Session.set(INIT_PAGE, window.location.pathname);
    }

    const pc = new msal.PublicClientApplication(config);

    setPublicClient(pc);

    pc.handleRedirectPromise()
      .then(response => {
        setLoading(false);
        if (response) {
          const usr = pc.getAccountByUsername(response?.account?.username);
          dispatch(setAuthData(usr));

          if (response.accessToken) {
            callMSGraph(graphConfig.graphMePhotoEndpoint, response.accessToken, data => {
              const TYPED_ARRAY = new Uint8Array(data);
              const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
              const base64String = btoa(STRING_CHAR);
              dispatch(setProfilePhoto(`data:image/*;base64, ${base64String}`));
            });

            Session.set(response.accessToken);
            const path = Session.get(INIT_PAGE);

            setInitialPath(path);
            Session.set(INIT_PAGE, null);
            setIsAuthenticated(true);
          }
        } else {
          pc.loginRedirect(loginScope);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
        setLoginError(error);
      });

    if (pc.getAccountByUsername()) {
      const usr = pc.getAccountByUsername();
      dispatch(setAuthData(usr));
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
      Session.set(response.accessToken);
    } catch (error) {
      try {
        setPopupOpen(true);
        const response = await publicClient.acquireTokenPopup(loginRequest);
        Session.set(response.accessToken);
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
      Session.set(t);
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
