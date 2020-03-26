import React, { useState, useEffect } from 'react';

import classes from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'; 
import Nav from '../Nav/Nav';
import AuthenticationService from '../../Helpers/AuthenticationService';
import axios from '../../axios-api';
import jwt_decode from 'jwt-decode';

const Login = ( props: any ) => {
    
    const[feedback, setFeedback] = useState(<div></div>);

    const languageTable = {
        Norwegian: {
        EmailLabel: "Din Email",
        PasswordLabel: "Ditt Passord",
        BugLabel: "Informasjonen din er feil eller noe gikk feil, last inn siden på nytt og prøv igjen.",
        WelcomeLabel: "Velkommen!"
        },
        English: {
        EmailLabel: "Your Email",
        PasswordLabel: "Your Password",
        BugLabel: "Your information is wrong or something went wrong. Refresh the page and try again.",
        WelcomeLabel: "Welcome!"
        }
    };

    const Login = async (evt: any) => {
        evt.preventDefault();
        var response = await AuthenticationService.login({Email: email, Password: password});
        setPassword("");
        setEmail("");
        if(response == true)
        {
            setFeedback(<div className={classes.Success}>{props.language === "Norwegian"?languageTable.Norwegian.WelcomeLabel:languageTable.English.WelcomeLabel}</div>);
            props.updateLanguageToUsers();
            props.history.replace("/");
        }
        else {
            setFeedback(<div className={classes.Failure}>{props.language === "Norwegian"?languageTable.Norwegian.BugLabel:languageTable.English.BugLabel}</div>);
        }
    }   

    const emailChangeHandler = (evt: any) => {
        setEmail(evt.target.value);
    }

    const passwordChangeHandler = (evt: any) => {
        setPassword(evt.target.value);
    }

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    return (
        <div className={classes.LoginDiv}>
            <Nav setNorwegian={props.setNorwegian} setEnglish={props.setEnglish} language={props.language} updateLanguageToUsers={props.updateLanguageToUsers}/>
            {feedback}
            <div className={classes.LoginForm}>
                <form onSubmit={Login}>
                <label>
                <FontAwesomeIcon icon={faAt}/> {props.language === "Norwegian"?languageTable.Norwegian.EmailLabel:languageTable.English.EmailLabel} 
                <input onChange={emailChangeHandler} required placeholder="email" type="email"></input>
                </label>
                <label>
                <FontAwesomeIcon icon={faKey}/> {props.language === "Norwegian"?languageTable.Norwegian.PasswordLabel:languageTable.English.PasswordLabel} 
                <input onChange={passwordChangeHandler} required placeholder="password" type="password"></input>
                </label>
                <div className={classes.LoginButton}> 
                    <button>Login</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login;