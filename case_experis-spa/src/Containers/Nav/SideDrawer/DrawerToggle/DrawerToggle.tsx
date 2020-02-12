import React from 'react';

import styles from './DrawerToggle.module.scss';

const drawerToggle = (props : any) => {
    let attachedClasses = [styles.DrawerToggle, styles.hidden];

    return(
        <div className={attachedClasses.join(" ")} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default drawerToggle;