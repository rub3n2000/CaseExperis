import React from 'react';

import styles from './NavigationItem.module.scss';

const navigationItem = ( props: any ) => {
    return (
        <div className={styles.NavigationItem}>
            <a href="#">A Link</a>
        </div>
    )
}

export default navigationItem;