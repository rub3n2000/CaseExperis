import React, { useEffect, useState } from 'react';

import styles from './Profil.module.scss';
import jwt_decode from 'jwt-decode';
import Nav from '../Nav/Nav';
import Kalendar from '../Kalendar/Kalendar';
import AuthenticationService from '../../Helpers/AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserShield, faSignature, faPhone, faPhoneAlt, faPlaneDeparture, faPlaneArrival, faAt } from '@fortawesome/free-solid-svg-icons'; 

const Profil = ( props: any ) => {
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

    const languageTable = {
        Norwegian: {
        ProfilLabel: "Profil Info",
        NameLabel: "Navn | ",
        PhoneNumberLabel: "Telefonnummer |",
        RemainingVacationDaysLabel: "Feriedager Igjen | ",
        TakenVacationDaysLabel: "Feriedager Tatt | ",
        EmailLabel: "Epost "
        },
        English: {
        ProfilLabel: "Profile Info",
        NameLabel: "Name | ",
        PhoneNumberLabel: "Phonenumber |",
        RemainingVacationDaysLabel: "Remaining Vacationdays | ",
        TakenVacationDaysLabel: "Taken Vacationsdays | ",
        EmailLabel: "Email "
        }
    };

    const[currentUser, setCurrentUser] = useState<userFilter>();

    useEffect(() => {
        const SetCurrentUser = async() => {
            let user: userFilter = await AuthenticationService.fetchCurrentUser();
            setCurrentUser(user as userFilter);
        };
        SetCurrentUser();
    }, [])

    let userInfo = null;
    if(currentUser)
    {
        userInfo = <div className={styles.ProfileInfo}>
        <span className={styles.ProfileInfoLabel}>{props.language === "Norwegian"?languageTable.Norwegian.ProfilLabel:languageTable.English.ProfilLabel}</span>
        <span><FontAwesomeIcon icon={faSignature}/> {props.language === "Norwegian"?languageTable.Norwegian.NameLabel:languageTable.English.NameLabel} 
        {(currentUser as user).fornavn + " " + (currentUser as user).etternavn}</span>
        <span><FontAwesomeIcon icon={faPhoneAlt}/>{props.language === "Norwegian"?languageTable.Norwegian.PhoneNumberLabel:languageTable.English.PhoneNumberLabel} {(currentUser as user).telefonNummer}</span>
        <span><FontAwesomeIcon icon={faPlaneDeparture}/> {props.language === "Norwegian"?languageTable.Norwegian.RemainingVacationDaysLabel:languageTable.English.RemainingVacationDaysLabel}
         {(currentUser as user).antallFerieIgjen}</span>
        <span><FontAwesomeIcon icon={faPlaneArrival}/> {props.language === "Norwegian"?languageTable.Norwegian.TakenVacationDaysLabel:languageTable.English.TakenVacationDaysLabel} 
        {(currentUser as user).antallFerieTatt}</span>
        <span><FontAwesomeIcon icon={faAt}/> {props.language === "Norwegian"?languageTable.Norwegian.EmailLabel:languageTable.English.EmailLabel}| {(currentUser as user).email}</span>
        </div>
    }

    
   
    return (
        <div className={styles.ProfileDiv}>
        <Nav setNorwegian={props.setNorwegian} setEnglish={props.setEnglish} language={props.language} updateLanguageToUsers={props.updateLanguageToUsers} 
        errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage} />
        <div className={styles.ProfileLayoutDiv}>
            {userInfo}
            <div className={styles.Kalendarer}>
            {currentUser &&<Kalendar language={props.language} vacationEdit wishKalender bruker={currentUser}
            setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            {currentUser &&<Kalendar language={props.language} vacationKalender bruker={currentUser}
            setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            </div>
        </div>
        
        </div>
    )
}

export default Profil;