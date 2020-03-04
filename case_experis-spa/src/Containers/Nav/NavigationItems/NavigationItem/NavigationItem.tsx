import React from 'react';

import styles from './NavigationItem.module.scss';

const navigationItem = ( props: any ) => {
    return (
        <div className={styles.NavigationItem}>
            <a href={props.link} onClick={props.NavItemClickHandler}>{props.children}</a>
        </div>
    )
}

export default navigationItem;