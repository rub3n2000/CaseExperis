import React, { useState } from 'react';

import styles from './Nav.module.scss';

import NavigationItems from './NavigationItems/NavigationItems'
import Logo from './Logo/Logo';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from './SideDrawer/SideDrawer';

const Nav = ( props : any ) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const openDrawerHandler = () => {
        setShowSideDrawer(true);
    }

    const englishLangHandler = ( props: any ) => {

    }

    const norskLangHandler = ( props: any) => {

    }

    const logOutHandler = ( props: any ) => {
        
    }

    return (
    <header className={styles.Navbar}>
    <Logo imgsrc="/logo152.png"/>
    <DrawerToggle clicked={openDrawerHandler}/>
    <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} logOutHandler={logOutHandler}
     englishLangHandler={englishLangHandler} norskLangHandler={norskLangHandler}/>
    <nav className={styles.DesktopOnly}>
        <NavigationItems logOutHandler={logOutHandler} englishLangHandler={englishLangHandler}
         norskLangHandler={norskLangHandler}/>
    </nav>
</header>
)
}

export default Nav;