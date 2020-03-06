import React, { useState } from 'react';

import classes from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'; 
import Nav from '../Nav/Nav';
import AuthenticationService from '../../Helpers/AuthenticationService';

const Login = ( props: any ) => {

    const[feedback, setFeedback] = useState(<div></div>);
    const Login = async (evt: any) => {
        evt.preventDefault();
        var response = await AuthenticationService.login({Email: email, Password: password});
        setPassword("");
        setEmail("");
        if(response == true)
        {
            setFeedback(<div className={classes.Success}>Welcome!</div>);
            props.history.replace("/");
        }
        else {
            setFeedback(<div className={classes.Failure}>Your information is wrong.</div>);
        }
    }

    const emailChangeHandler = (evt: any) => {
        console.log(evt.target.value);
        setEmail(evt.target.value);
    }

    const passwordChangeHandler = (evt: any) => {
        console.log(evt.target.value);
        setPassword(evt.target.value);
    }

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    



    return (
        <div className={classes.LoginDiv}>
            <Nav/>
            {feedback}
            <div className={classes.LoginForm}>
                <form onSubmit={Login}>
                <label>
                <FontAwesomeIcon icon={faAt}/> Your Email <input onChange={emailChangeHandler} required placeholder="email" type="email"></input>
                </label>
                <label>
                <FontAwesomeIcon icon={faKey}/> Your Password <input onChange={passwordChangeHandler} required placeholder="password" type="password"></input>
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