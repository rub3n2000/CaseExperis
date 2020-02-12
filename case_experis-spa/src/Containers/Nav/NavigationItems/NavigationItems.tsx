import React from 'react';

import styles from './NavigationItems.module.scss';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props: any ) => {
    return (
        <div className={styles.NavigationItems}>
        <div className={styles.NavigationButtons}>
            <NavigationItem/>
            <NavigationItem/>
            <NavigationItem/>
        </div>
        <div className={styles.LanguageButtons}>
        <NavigationItem/>
        <NavigationItem/>
        </div>
        </div>
    )
}

export default navigationItems;