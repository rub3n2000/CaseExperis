import React from 'react';

import styles from './Frontside.module.css';

import Navbar from '../../Components/Nav/Navbar/Navbar';
import Kalendar from '../../Components/Kalendar/Kalendar';

const Frontside = ( props : any ) => {
return (
    <div className={styles.LayoutDiv}>
        <Navbar/>
        <Kalendar/>
    </div>
);
}

export default Frontside;