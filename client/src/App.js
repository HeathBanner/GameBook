import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';

import Social from './pages/Main/Social';

const App = () => {
  return (
    <AuthProvider>
    <MediaProvider>
      
      <Switch>
        <Route exact path="/" component={Social} />
      </Switch>

    </MediaProvider>
    </AuthProvider>
  );
};

export default App;
