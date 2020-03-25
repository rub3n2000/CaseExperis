import React from 'react';
import styles from './App.module.scss';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Frontside from './Containers/Frontside/Frontside';
import Admin from './Containers/Admin/Admin';
import Login from './Containers/Login/Login';
import Profil from './Containers/Profil/Profil';
import AuthenticationService from '../src/Helpers/AuthenticationService';

const App = () => {

  const PrivateRoute = ({ component: Component, ...rest } : any) => (
    <Route {...rest} render={(props) => (
      AuthenticationService.isLoggedIn() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  );

  const AdminRoute = ({ component: Component, ...rest } : any) => (
    <Route {...rest} render={(props) => (
      AuthenticationService.isAdmin() === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  );

  return (
    <div className={styles.App}>
      <BrowserRouter>
      <Switch>
      <PrivateRoute path="/profile" component={Profil}/>
      <AdminRoute path="/admin" component={Admin}/>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Frontside}/>
      </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
