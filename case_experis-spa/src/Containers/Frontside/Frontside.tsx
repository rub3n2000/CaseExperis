import React from 'react';

import styles from './Frontside.module.scss';

import Navbar from '../../Components/Nav/Navbar/Navbar';
import Kalendar from '../../Components/Kalendar/Kalendar';

const Frontside = ( props : any ) => {
return (
    <div className={[styles.LayoutDiv, styles.Centered].join(' ')}>
        <Navbar/>
        <Kalendar/>
    </div>
);
}

export default Frontside;