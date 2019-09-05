import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';

// import Social from './pages/Main/Social';
import Temp from './pages/Main/Temp';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  return (
    <AuthProvider>
    <MediaProvider>
      
      <Switch>
        <Route exact path="/" component={Temp} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>

    </MediaProvider>
    </AuthProvider>
  );
};

export default App;
