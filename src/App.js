import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Menu from './components/Menu';
import Main from './components/Main';
import Login from './components/Login';
import PlasticTrash from './components/PlasticTrash';
import EnvChart from './components/EnvChart';
import { isLoggedInState } from './states';

const App = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <BrowserRouter>
      <Menu />
      {!isLoggedIn && <Redirect path="*" to="/login" />}
      <>
        <Route exact path="/CAGO-Frontend" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/trash" component={PlasticTrash} />
        <Route path="/chart" component={EnvChart} />
      </>
    </BrowserRouter>
  );
};

export default App;
