import React, { useState, useEffect } from 'react';

import styles from './Frontside.module.scss';

import Nav from '../Nav/Nav';
import Kalendar from '../../Components/Kalendar/Kalendar';

const Frontside = ( props : any ) => {

    type ferier = {
        id: number,
        date: Date,
        isGodkjent: boolean,
        ansattNotat: string,
        adminNotat: string,
        user: object,
        userId: number
    };

    const [ferier, setFerier] = useState<ferier>();

    useEffect(() => {
        
    }, []);

    return (
        <div className={[styles.LayoutDiv, styles.CenteredH].join(' ')}>
            <Nav/>
            <Kalendar/>
        </div>
    );
}

export default Frontside;