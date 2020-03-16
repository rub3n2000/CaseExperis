import React, { useState, useEffect } from 'react';

import styles from './Admin.module.scss';
import Employees from './Employees/Employees';
import Kalendar from '../Kalendar/Kalendar';
import Nav from '../Nav/Nav';
import axios from '../../axios-api';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';
import UserEditor from './Employees/UserEditor/UserEditor';
import { arrowFunctionExpression } from '@babel/types';

const Admin = ( props: any ) => {

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

    type userToRegistrer = {
        id: number,
        fornavn: string,
        etternavn: string,
        telefonNummer: string,
        email: string,
        antallFerieTatt: number,
        antallFerieIgjen: number,
        languageCode: string,
        password: string,
        ferier: object
    }

    type users = user[] | undefined;
    type userFilter = Partial<userToRegistrer> | undefined;

    const FetchUsers = async() => {
        let users: Partial<users> = [];
        await axios.get<users>("/users").then(response => {
            users = response.data;
        }).catch((error) => {console.log(error);});
        return users;
    };

    const [users, setUsers] = useState<users>();
    const [userEditorVisible, setUserEditorVisible] = useState<boolean>(false);
    const [currentlyEditedUser, setCurrentlyEditedUser] = useState<userFilter>();
    const [currentEditsOnUser, setCurrentEditsOnUser] = useState<userFilter>();

    useEffect(() => {
        const SetTheUsers = async() => {
            var users = await FetchUsers();
            setUsers(users as users);
        };
        SetTheUsers();    
    }, [JSON.stringify(userEditorVisible)])

    const userEditorCloseHandler = () => {
        setUserEditorVisible(false);
        setCurrentlyEditedUser(undefined);
        setCurrentEditsOnUser(undefined);
    }

    const userEditorOpenHandler = (user: user) => {
        setUserEditorVisible(true);
        setCurrentlyEditedUser(user);
        setCurrentEditsOnUser(user);
    }

    const NewUser = async (e: any) => {
        e.preventDefault();
        if(currentEditsOnUser)
        {
        let response = await axios.get("/users/" + currentEditsOnUser.id);
        if(response.status !== 200)
        {
            let token = "Bearer " + localStorage.getItem("access_token");
            axios.defaults.headers.Authorization = token;
            const res = await axios.post("/auth/register", currentEditsOnUser);
            if(res.status === 201) {
                userEditorCloseHandler();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let token = "Bearer " + localStorage.getItem("access_token");
            axios.defaults.headers.Authorization = token;
            const res = await axios.put("/users/"+ currentEditsOnUser.email, currentEditsOnUser);
            if(res.status === 204) {
                userEditorCloseHandler();
                return true;
            }
            else {
                return false;
            }
        }
        }
        else {
            return false;
        }

    }

    const deleteUser = async () => {
        if(currentEditsOnUser) {
            const res = await axios.delete("/users/" + currentEditsOnUser.email);
            if(res.status === 200) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    const makeAdmin = () => {
        if(currentEditsOnUser) {

        }
    }

    const fornavnChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.fornavn = e.value;
        }
        else {
            user = {};
            user.fornavn = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const etternavnChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.etternavn = e.value;
        }
        else {
            user = {};
            user.etternavn = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const passwordChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.password = e.value;
        }
        else {
            user = {};
            user.password = e.value;
        }
        setCurrentEditsOnUser(user as userFilter);
    }

    const mobilnummerChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.telefonNummer = e.value;
        }
        else {
            user = {};
            user.telefonNummer = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const emailChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.email = e.value;
        }
        else {
            user = {};
            user.email = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const ferieDagerIgjenChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.antallFerieIgjen = e.value;
        }
        else {
            user = {};
            user.antallFerieIgjen = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const ferieDagerTattChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.antallFerieTatt = e.value;
        }
        else {
            user = {};
            user.antallFerieTatt = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const languageChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.languageCode = e.value;
        }
        else {
            user = {};
            user.languageCode = e.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }
    
    return (
        <div className={styles.AdminDiv}>
            <Backdrop show={userEditorVisible} clicked={userEditorCloseHandler}/>
            <Nav/>
            {users && <Employees users={users} userEditorOpenHandler={userEditorOpenHandler}/>}
            {users && (currentlyEditedUser != undefined) && <UserEditor NewUser={NewUser} fornavnChangeHandler={fornavnChangeHandler} etternavnChangeHandler={etternavnChangeHandler}
             mobilnummerChangeHandler={mobilnummerChangeHandler} emailChangeHandler={emailChangeHandler} ferieDagerIgjenChangeHandler={ferieDagerIgjenChangeHandler}
             ferieDagerTattChangeHandler={ferieDagerTattChangeHandler} languageChangeHandler={languageChangeHandler} deleteUser={deleteUser} 
             passwordChangeHandler={passwordChangeHandler} makeAdmin={makeAdmin} user={currentlyEditedUser} visible={userEditorVisible}/>}
            <Kalendar vacationEdit adminKalender wishKalender/>
            <Kalendar vacationEdit adminKalender vacationKalender/>
        </div>
    )
}

export default Admin;