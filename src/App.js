import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Main from './components/Main';
import Login from './components/Login';
import PlasticTrash from './components/PlasticTrash';
import EnvChart from './components/EnvChart';

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Route exact path="/CAGO-Frontend" render={() => <Main />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/trash" render={() => <PlasticTrash />} />
      <Route path="/chart" render={() => <EnvChart />} />
    </BrowserRouter>
  );
};

export default App;
