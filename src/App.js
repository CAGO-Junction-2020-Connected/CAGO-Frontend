import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PlasticTrash from './components/PlasticTrash';
import EnvChart from './components/EnvChart';
import Menu from './components/Menu';

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Route
        path="/trash"
        render={() => <PlasticTrash currentUserPlastic={7} />}
      />
      <Route
        path="/chart"
        render={() => <EnvChart currentUserPlasticPercent={60} />}
      />
    </BrowserRouter>
  );
};

export default App;
