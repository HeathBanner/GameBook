import React, { createContext, useState, useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import TokenStore from '../library/TokenStore';

export const AuthContext = createContext();

const initUser = {
  info: '',
  token: TokenStore.getToken(),
};

export const AuthProvider = (props) => {

  const [user, setUser] = useState({ ...initUser });
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (!user.token) { return; }
  //   fetch('/api/users/verify')
  //     .then(res => res.json())
  //     .then((user) => {
  //       console.log(user);
  //       return setUser({ ...user });
  //     })
  //     .catch(() => { console.log('Oops...'); });
  // }, [user]);

  const handleLogin = (user, authToken) => {
    TokenStore.setToken(authToken);
    setUser({
      info: { ...user },
      token: authToken,
    });
  };

  const handleLogout = () => {
    TokenStore.clearToken();
    setUser({ ...initUser });
    return setLoggedIn(false);
  };

  const getNewStory = () => {
    fetch('/api/users/portfolio')
      .then(res => res.json())
      .then((user) => { return setUser({ ...user }); })
      .catch(() => { console.log('Ooops...'); });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        loggedIn,
        getNewStory,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
