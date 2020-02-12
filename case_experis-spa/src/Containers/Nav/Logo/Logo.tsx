import React from 'react';

import styles from './Logo.module.scss';

const logo = ( props: any ) => {
    return (
        <div className={styles.Logo}>
           <a href="/"><img src={window.location.origin + '/logo192.png'}/></a>
        </div>
    )
}

export default logo;