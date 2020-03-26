import React, { useState } from 'react';
import styles from './App.module.scss';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Frontside from './Containers/Frontside/Frontside';
import Admin from './Containers/Admin/Admin';
import Login from './Containers/Login/Login';
import Profil from './Containers/Profil/Profil';
import AuthenticationService from '../src/Helpers/AuthenticationService';
import jwt_decode from 'jwt-decode';
import axios from './axios-api';

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

  type user = {
    id: number,
    fornavn: string,
    etternavn: string,
    telefonNummer: string,
    email: string,
    antallFerieTatt: number,
    antallFerieIgjen: number,
    languageCode: string,
    ferier: object
}

type userFilter = user | undefined;
    
    type languageType = "Norwegian" | "English";
    const [language, setLanguage] = useState<languageType>("Norwegian");

    const SetNorwegian = async( e: any) => {
        e.preventDefault();
        setLanguage("Norwegian");
        if(localStorage.getItem("access_token"))
        {
        let theResponse: any;
        theResponse = await axios.get("/users/" + (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid);
        let user: userFilter = theResponse.data as userFilter;
        user?user.languageCode === "EN"?user.languageCode = "NO": user.languageCode = "NO": user = undefined;
        let token = "Bearer " + localStorage.getItem("access_token");
        axios.defaults.headers.Authorization = token;
        const res = await axios.put("/users/"+ (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid, user);
        if(res.status === 204) {
            return true;
        }
        else {
            return false;
        }
        }
    };

    const SetEnglish = async( e: any ) => {
        e.preventDefault();
        setLanguage("English");
        if(localStorage.getItem("access_token"))
        {
        let theResponse: any;
        theResponse = await axios.get("/users/" + (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid);
        let user: userFilter = theResponse.data as userFilter;
        user?user.languageCode === "NO"?user.languageCode = "EN": user.languageCode = "EN": user = undefined;
        let token = "Bearer " + localStorage.getItem("access_token");
        axios.defaults.headers.Authorization = token;
        const res = await axios.put("/users/"+ (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid, user);
        if(res.status === 204) {
            return true;
        }
        else {
            return false;
        }
        }
        
    };

    const UpdateLanguageToUsers = async() => {
        if(localStorage.getItem("access_token"))
        {
        let theResponse: any;
        theResponse = await axios.get("/users/" + (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid);
        let user: userFilter = theResponse.data as userFilter;
        user?user.languageCode === "NO"?setLanguage("Norwegian"): setLanguage("English"): user = undefined;
        }
    }

  return (
    <div className={styles.App}>
      <BrowserRouter>
      <Switch>
      <Route path="/profile" render={AuthenticationService.isLoggedIn() === true?(props : any) => 
      <Profil {...props} language={language} setEnglish={SetEnglish} 
      setNorwegian={SetNorwegian} updateLanguageToUsers={UpdateLanguageToUsers}/>:
      (props: any) => <Login {...props} language={language} setEnglish={SetEnglish}
      setNorwegian={SetNorwegian} updateLanguageToUsers={UpdateLanguageToUsers}/>}/>

      <Route path="/admin" render={AuthenticationService.isAdmin() === true?(props : any) => 
      <Admin {...props} language={language} setEnglish={SetEnglish}
      setNorwegian={SetNorwegian} updateLanguageToUsers={UpdateLanguageToUsers}/>:(props:any) => 
      <Login {...props} language={language} setEnglish={SetEnglish}
      setNorwegian={SetNorwegian} updateLanguageToUsers={UpdateLanguageToUsers}/>}/>}/>

      <Route path="/login" render={(props: any) => 
      <Login {...props} language={language} setEnglish={SetEnglish}
      setNorwegian={SetNorwegian} updateLanguageToUsers={UpdateLanguageToUsers}/>}/>

      <Route path="/" render={(props : any) => 
      <Frontside {...props} language={language} setEnglish={SetEnglish} 
      setNorwegian={SetNorwegian} updateLanguageToUsers={UpdateLanguageToUsers}/>}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
