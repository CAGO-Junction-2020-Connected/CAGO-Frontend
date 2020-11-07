import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PlasticTrash from './components/PlasticTrash';
import EnvChart from './components/EnvChart';
import Menu from './components/Menu';
import Main from './components/Main';

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Route exact path="/CAGO-Frontend" render={() => <Main />} />
      <Route
        path="/trash"
        render={() => <PlasticTrash currentUserPlastic={10} />}
      />
      <Route
        path="/chart"
        render={() => <EnvChart currentUserPlasticPercent={60} />}
      />
    </BrowserRouter>
  );
};

export default App;
