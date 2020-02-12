import React from 'react';

import styles from './Backdrop.module.scss';

const backdrop = (props: any) => {
    if(props.show){
        return(
            <div className={styles.Backdrop} onClick={props.clicked}></div>
        )
    }
    return null;
};

export default backdrop;