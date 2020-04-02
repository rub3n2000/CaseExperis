import React, { useState, useEffect } from 'react';

import styles from './Admin.module.scss';
import Employees from './Employees/Employees';
import Kalendar from '../Kalendar/Kalendar';
import Nav from '../Nav/Nav';
import axios from '../../axios-api';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';
import UserEditor from './Employees/UserEditor/UserEditor';
import { arrowFunctionExpression } from '@babel/types';
import EmbargoEditor from './EmbargoEditor/EmbargoEditor';
import { withRouter } from 'react-router-dom';
import jwt_decoder from 'jwt-decode';
import { loadavg } from 'os';

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

    type embargo = {
        id?: number,
        date: string
    }

    type embargoes = embargo[];

    type embargoFilter = embargo | undefined;
    type embargoesFilter = embargoes | undefined;

    type users = user[] | undefined;
    type userFilter = Partial<userToRegistrer> | undefined;
    type language = "Norwegian" | "English";

    const FetchUsers = async() => {
        let users: Partial<users> = [];
        await axios.get<users>("/users").then(response => {
            users = response.data;
        }).catch((error) => {console.log(error); userEditorCloseHandlerWithoutReload(); props.setErrorMessage("User's couldn't be fetched. Try again later, and contact support if problem continues.")});
        return users;
    };

    const FormatDateAsMonthDayYearString = (date: Date) => {
        var removeDayName = date.toISOString().substring(0,10);
        return removeDayName;
    }

    const [users, setUsers] = useState<users>();
    const [userEditorVisible, setUserEditorVisible] = useState<boolean>(false);
    const [currentlyEditedUser, setCurrentlyEditedUser] = useState<userFilter>();
    const [currentEditsOnUser, setCurrentEditsOnUser] = useState<userFilter>();
    const [embargoVisible, setEmbargoVisible] = useState<boolean>(false);
    const [currentEmbargo, setCurrentEmbargo] = useState<embargoFilter>();
    const [embargoDate, setEmbargoDate] = useState(FormatDateAsMonthDayYearString(new Date()));
    const [language, setLanguage] = useState<language>("Norwegian");

    useEffect(() => {
        const SetTheUsers = async() => {
            var users = await FetchUsers();
            setUsers(users as users);
        };
        SetTheUsers();    
    }, [JSON.stringify(userEditorVisible)])

    const userEditorCloseHandler = () => {
        setUserEditorVisible(false);
        setEmbargoVisible(false);
        setCurrentEmbargo(undefined);
        setEmbargoDate(FormatDateAsMonthDayYearString(new Date()));
        setCurrentlyEditedUser(undefined);
        setCurrentEditsOnUser(undefined);
        props.history.go(0);
    }

    const userEditorCloseHandlerWithoutReload = () => {
        setUserEditorVisible(false);
        setEmbargoVisible(false);
        setCurrentEmbargo(undefined);
        setEmbargoDate(FormatDateAsMonthDayYearString(new Date()));
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
            let response : any;
            if(currentEditsOnUser.id != undefined)
            {
                try {
                    response = await axios.get("/users/" + currentEditsOnUser.id);
                }
                catch {
                    response = {status: 401};
                }
            }
            else { response = {status: 401};}
        if(response.status !== 200)
        {
            try {
                let token = "Bearer " + localStorage.getItem("access_token");
                axios.defaults.headers.Authorization = token;
                console.log(currentEditsOnUser);
                const res = await axios.post("/auth/register", currentEditsOnUser);
                if(res.status === 201) {
                    console.log("yup");
                    console.log(currentEditsOnUser);
                    userEditorCloseHandler();
                    return true;
                }
                else {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Making the new user failed. Try again later. If the problem continues contact support. Remember that the password has to include a number and a special character.");
                    return false;
                }
            }
            catch {
                userEditorCloseHandlerWithoutReload();
                props.setErrorMessage("Making the new user failed. Try again later. If the problem continues contact support. Remember that the password has to include a number and a special character.");
                return false;
            }
        }
        else {
            try {
                let token = "Bearer " + localStorage.getItem("access_token");
                axios.defaults.headers.Authorization = token;
                const res = await axios.put("/users/"+ currentEditsOnUser.email, currentEditsOnUser);
                if(res.status === 200) {
                    userEditorCloseHandler();
                    return true;
                }
                else {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Updating the user failed. Try again later. If the problem continues contact support. If you tried changing the password, remember that it has to include a number and special character.");
                    return false;
                }
            }
            catch {
                userEditorCloseHandlerWithoutReload();
                props.setErrorMessage("Updating the user failed. Try again later. If the problem continues contact support. If you tried changing the password, remember that it has to include a number and special character.");
                return false;
            }
        }
        }
        else {
            return false;
        }
    }

    const deleteUser = async ( e: any ) => {
        console.log(localStorage.getItem("access_token"));
        if(currentEditsOnUser) {
            e.preventDefault();
            try {
                let token = "Bearer " + localStorage.getItem("access_token");
                axios.defaults.headers.Authorization = token;
                const res = await axios.delete("/users/" + currentEditsOnUser.email);
                if(res.status === 200) {
                    userEditorCloseHandlerWithoutReload();
                    return true;
                }
                else {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Deleting the user failed. Try again later. If the problem continues contact support.");
                    return false;
                }
            }
            catch {
                userEditorCloseHandlerWithoutReload();
                props.setErrorMessage("Deleting the user failed. Try again later. If the problem continues contact support.");
                return false;
            }
        }
        else {
            return false;
        }
    }

    const makeAdmin = async ( e: any ) => {
        e.preventDefault();
        let token = "Bearer " + localStorage.getItem("access_token");
        let tokenObject = jwt_decoder(token as string) as any;
        if(currentEditsOnUser && tokenObject.role.includes("Admin")) {
            try {
                let token = "Bearer " + localStorage.getItem("access_token");
                axios.defaults.headers.Authorization = token;
                const res = await axios.patch("/users/" + currentEditsOnUser.email);
                if(res.status === 200) {
                    userEditorCloseHandlerWithoutReload();
                    return true;
                }
                else {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Making the user an admin failed. Try again later. If the problem continues contact support.");
                    return false;
                }
            }
            catch {
                userEditorCloseHandlerWithoutReload();
                props.setErrorMessage("Making the user an admin failed. Try again later. If the problem continues contact support.");
                return false; 
            }
        }
        userEditorCloseHandlerWithoutReload();
        props.setErrorMessage("You don't have the authorization to do that.");
        return false;
    }

    const fornavnChangeHandler = (e: any) => {
        console.log(e.target.value);
        var user = currentEditsOnUser;
        if(user){
            user.fornavn = e.target.value;
        }
        else {
            user = {};
            user.fornavn = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const etternavnChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.etternavn = e.target.value;
        }
        else {
            user = {};
            user.etternavn = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const passwordChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.password = e.target.value;
        }
        else {
            user = {};
            user.password = e.target.value;
        }
        setCurrentEditsOnUser(user as userFilter);
    }

    const mobilnummerChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.telefonNummer = e.target.value;
        }
        else {
            user = {};
            user.telefonNummer = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const emailChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.email = e.target.value;
        }
        else {
            user = {};
            user.email = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const ferieDagerIgjenChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.antallFerieIgjen = e.target.value;
        }
        else {
            user = {};
            user.antallFerieIgjen = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const ferieDagerTattChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.antallFerieTatt = e.target.value;
        }
        else {
            user = {};
            user.antallFerieTatt = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const languageChangeHandler = (e: any) => {
        var user = currentEditsOnUser;
        if(user){
            user.languageCode = e.target.value;
        }
        else {
            user = {};
            user.languageCode = e.target.value;
        }
        setCurrentEditsOnUser(user as Partial<user>);
    }

    const newEmbargoHandler = () => {
        setEmbargoVisible(true);
        setCurrentEmbargo(undefined);
    }

    const FormatDateAsDateString = (date: string) => {
        let dateString = date.substring(0,10);
        return dateString;
    }

    const NewEmbargo = async ( e: any ) => {
        e.preventDefault();
        if(currentEmbargo != undefined)
        {
            console.log(typeof currentEmbargo.date);
            if(FormatDateAsDateString(currentEmbargo.date) !== embargoDate) {
                try {
                    let newEmbargo = {
                        date: new Date(embargoDate)
                    }
                    let token = "Bearer " + localStorage.getItem("access_token");
                    axios.defaults.headers.Authorization = token;
                    const res = await axios.put("/embargo/" + currentEmbargo.id, newEmbargo);
                    if(res.status === 200) {
                        userEditorCloseHandler();
                        return true;
                    }
                    else {
                        userEditorCloseHandlerWithoutReload();
                        props.setErrorMessage("Creating the embargo failed. Try again later. If the problem continues contact support.");
                        return false;
                    }
                }
                catch {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Creating the embargo failed. Try again later. If the problem continues contact support.");
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            try {
                console.log("yey");
                let token = "Bearer " + localStorage.getItem("access_token");
                axios.defaults.headers.Authorization = token;
                const res = await axios.post("/embargo", {date: new Date(embargoDate)});
                if(res.status === 201) {
                    userEditorCloseHandler();
                    return true;
                }
                else {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Updating the embargo failed. Try again later. If the problem continues contact support.");
                    return false;
                }
            }
            catch {
                userEditorCloseHandlerWithoutReload();
                props.setErrorMessage("Updating the embargo failed. Try again later. If the problem continues contact support.");
                return false;
            }
        }
    }

    const DeleteEmbargo = async () => {
        if(currentEmbargo != undefined) {
            try {
                let token = "Bearer " + localStorage.getItem("access_token");
                axios.defaults.headers.Authorization = token;
                let res = await axios.delete("/embargo/" + currentEmbargo.id);
                if(res.status === 200) {
                    userEditorCloseHandler();
                    return res;
                } else {
                    userEditorCloseHandlerWithoutReload();
                    props.setErrorMessage("Deleting the embargo failed. Try again later. If the problem continues contact support.");
                    return false;
                }
            }
            catch {
                userEditorCloseHandlerWithoutReload();
                props.setErrorMessage("Deleting the embargo failed. Try again later. If the problem continues contact support.");
                return false;
            }
        }
        return false;
    }

    const EmbargoDateChangedHandler = ( e: any ) => {
        setEmbargoDate(e.target.value);
    }

    const setTheEmbargo = (embargo : embargoFilter) => {
        console.log(embargo);
        setCurrentEmbargo(embargo);
        setEmbargoVisible(true);
    }
    
    return (
        <div className={styles.AdminDiv}>
            <Backdrop show={userEditorVisible || embargoVisible} clicked={userEditorCloseHandler}/>
            <Nav setNorwegian={props.setNorwegian} setEnglish={props.setEnglish} language={props.language} updateLanguageToUsers={props.updateLanguageToUsers}
            errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>
            {users && <Employees  language={props.language} users={users} userEditorOpenHandler={userEditorOpenHandler} 
            setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            {users && <UserEditor language={props.language} NewUser={NewUser} fornavnChangeHandler={fornavnChangeHandler} etternavnChangeHandler={etternavnChangeHandler}
             mobilnummerChangeHandler={mobilnummerChangeHandler} emailChangeHandler={emailChangeHandler} ferieDagerIgjenChangeHandler={ferieDagerIgjenChangeHandler}
             ferieDagerTattChangeHandler={ferieDagerTattChangeHandler} languageChangeHandler={languageChangeHandler} deleteUser={deleteUser} 
             passwordChangeHandler={passwordChangeHandler} makeAdmin={makeAdmin} user={currentlyEditedUser} visible={userEditorVisible}
             setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            <Kalendar language={props.language} setEmbargo={setTheEmbargo} vacationEdit newEmbargoHandler={newEmbargoHandler} adminKalender wishKalender
            setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>
            <Kalendar language={props.language} setEmbargo={setTheEmbargo} vacationEdit newEmbargoHandler={newEmbargoHandler} adminKalender vacationKalender
            setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>
            <EmbargoEditor language={props.language} visible={embargoVisible} NewEmbargo={NewEmbargo} embargo={currentEmbargo} embargoDateChangeHandler={EmbargoDateChangedHandler}
             deleteEmbargo={DeleteEmbargo} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>
        </div>
    )
}

export default withRouter(Admin);