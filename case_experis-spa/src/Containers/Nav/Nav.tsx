import React, { useState, useEffect } from 'react';

import styles from './Nav.module.scss';

import NavigationItems from './NavigationItems/NavigationItems'
import Logo from './Logo/Logo';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from './SideDrawer/SideDrawer';
import axios from '../../axios-api';
import Authenticationservice from '../../Helpers/AuthenticationService';
import jwt_decode from 'jwt-decode';

const Nav = ( props : any ) => {

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
    };

    type userFilter = user | undefined;

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const openDrawerHandler = () => {
        setShowSideDrawer(true);
    }

    const englishLangHandler = async ( e: any ) => {
        
    }

    const norskLangHandler = async ( e: any) => {
        e.preventDefault();
        
    }

    const logOutHandler = ( props: any ) => {
        Authenticationservice.logout();
    }
    if(localStorage.getItem("access_token") !== null)
    {
        if((jwt_decode(localStorage.getItem("access_token") as string) as any).exp < new Date().getTime().toString().substr(0,10))
        {
            localStorage.removeItem("access_token");
        }
    }

    useEffect(() => {
        console.log(props.setNorwegian);
    }, []);

    return (
    <header className={styles.Navbar}>
    <Logo imgsrc="/logo152.png"/>
    <DrawerToggle clicked={openDrawerHandler}/>
    <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} logOutHandler={logOutHandler}
     englishLangHandler={props.setEnglish} norskLangHandler={props.setNorwegian} user={localStorage.getItem("access_token")} language={props.language}/>
    <nav className={styles.DesktopOnly}>
    <NavigationItems logOutHandler={logOutHandler} englishLangHandler={props.setEnglish}
        norskLangHandler={props.setNorwegian} user={localStorage.getItem("access_token")} language={props.language}/>
    </nav>
</header>
)
}

export default Nav;