import React from 'react';
import styles from './App.module.scss';

import { Route, Switch } from 'react-router-dom';

import Frontside from './Containers/Frontside/Frontside';
import Admin from './Containers/Admin/Admin';
import Login from './Containers/Login/Login';
import Profil from './Containers/Profil/Profil';

const App = () => {
  return (
    <div className={styles.App}>
      <Switch>
      <Route path="/profil" component={Profil}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Frontside}/>
      </Switch>
    </div>
  );
}

export default App;
