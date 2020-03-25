import React from 'react';

import styles from './NavigationItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 

import NavigationItem from './NavigationItem/NavigationItem';
import AuthenticationService from '../../../Helpers/AuthenticationService';

const navigationItems = ( props: any ) => {

    const adminNav = AuthenticationService.isAdmin()?<NavigationItem link={"/admin"}><FontAwesomeIcon icon={faUserShield}/> Admin </NavigationItem>: <></>;
    let navigationButtons;
    if(props.user !== null)
    {
        navigationButtons = <div className={styles.NavigationButtons}>
        <NavigationItem link={"/profile"}><FontAwesomeIcon icon={faUserCircle}/> Profile</NavigationItem>
        {adminNav}
        <NavigationItem link="/" NavItemClickHandler={props.logOutHandler}> <FontAwesomeIcon icon={faSignOutAlt}/> Logout</NavigationItem>
    </div>
    }
    else {
        navigationButtons = <div className={styles.NavigationButtons}>
        <NavigationItem link="/login"> <FontAwesomeIcon icon={faSignOutAlt}/> Login</NavigationItem>
    </div>
    } 
    return (
        <div className={styles.NavigationItems}>
        {navigationButtons}
        <div className={styles.LanguageButtons}>
        <NavigationItem link="#" NavItemClickHandler={props.englishLangHandler}><img src={window.location.origin + '/united-kingdom-flag-icon-32.png'}/> EN</NavigationItem>
        <NavigationItem link="#" NavItemClickHandler={props.norskLangHandler}><img src={window.location.origin + '/norway-flag-icon-32.png'}/> NO</NavigationItem>
        </div>
        </div>
    )
}

export default navigationItems;