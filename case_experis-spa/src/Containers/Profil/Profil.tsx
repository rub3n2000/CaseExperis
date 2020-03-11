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
        <span className={styles.ProfileInfoLabel}>Profil Info</span>
        <span><FontAwesomeIcon icon={faSignature}/> Navn | {(currentUser as user).fornavn + " " + (currentUser as user).etternavn}</span>
        <span><FontAwesomeIcon icon={faPhoneAlt}/> TelefonNummer | {(currentUser as user).telefonNummer}</span>
        <span><FontAwesomeIcon icon={faPlaneDeparture}/> Feriedager Igjen | {(currentUser as user).antallFerieIgjen}</span>
        <span><FontAwesomeIcon icon={faPlaneArrival}/> Feriedager tatt | {(currentUser as user).antallFerieTatt}</span>
        <span><FontAwesomeIcon icon={faAt}/> Email | {(currentUser as user).email}</span>
        </div>
       
    }

    
   
    return (
        <div className={styles.ProfileDiv}>
        <Nav/>
        <div className={styles.ProfileLayoutDiv}>
            {userInfo}
            <div className={styles.Kalendarer}>
            {currentUser &&<Kalendar vacationEdit wishKalender bruker={currentUser}/>}
            {currentUser &&<Kalendar vacationKalender bruker={currentUser}/>}
            </div>
        </div>
        
        </div>
    )
}

export default Profil;