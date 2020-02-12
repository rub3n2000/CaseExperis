import React from 'react';

import styles from './Frontside.module.scss';

import Nav from '../Nav/Nav';
import Kalendar from '../../Components/Kalendar/Kalendar';

const Frontside = ( props : any ) => {
return (
    <div className={[styles.LayoutDiv, styles.CenteredH].join(' ')}>
        <Nav/>
        <Kalendar/>
    </div>
);
}

export default Frontside;