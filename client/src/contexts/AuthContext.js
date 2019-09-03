import React, { createContext, useState, useEffect } from 'react';

import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const AuthContext = createContext();

export const AuthProvider = (props) => {

  const theme = useTheme();

  const xl = useMediaQuery(theme.breakpoints.up('lg'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  
  const [auth, setAuth] = useState('');

//   const getWidth = () => {
//     switch (true) {
//         case xs:
//             return console.log('xs');
//         case sm:
//             return console.log('sm');
//         case md:
//             return console.log('md');
//         case lg:
//             return console.log('lg');
//         default:
//             return console.log('xl');
//     }
// };

// getWidth();

  useEffect(() => {
    if (auth) { return }
    fetch('/api/users/portfolio')
      .then(res => res.json())
      .then((user) => {
        return setAuth({ ...user });
      })
      .catch(err => { return });
  }, [auth]);

  const getNewStory = () => {
    fetch('/api/users/portfolio')
      .then(res => res.json())
      .then((user) => {
        return setAuth({ ...user });
      })
      .catch(err => { return });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        getNewStory,
        xl,
        lg,
        md,
        sm,
        xs,
      }}
    >

      {props.children}

    </AuthContext.Provider>
  )
};
