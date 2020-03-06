import React from 'react';
import styles from './App.module.scss';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Frontside from './Containers/Frontside/Frontside';
import Admin from './Containers/Admin/Admin';
import Login from './Containers/Login/Login';
import Profil from './Containers/Profil/Profil';
import VacationWishEditor from './Containers/VacationWishEditor/VacationWishEditor';

const App = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
      <Switch>
      <Route path="/profile" component={Profil}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/login" component={Login}/>
      <Route path="/ferie/new" component={VacationWishEditor}/>
      <Route path="/" component={Frontside}/>
      </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
