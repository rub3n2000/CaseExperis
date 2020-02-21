import React, { useState, useEffect } from 'react';

import styles from './Frontside.module.scss';

import Nav from '../Nav/Nav';
import Kalendar from '../../Components/Kalendar/Kalendar';
import axios from '../../axios-api';

const Frontside = ( props : any ) => {

    type ferier = [{
        date: Date,
        isGodkjent: boolean,
        ansattNotat: string,
        adminNotat: string,
        user: object,
        userId: number
    }];

    const [ferier, setFerier] = useState<ferier>();

    useEffect(() => {
        const fetchAndSet = async () => {
            await axios.get('/ferie').then(response => {
                setFerier(response.data);
            }).catch(error => {
                console.log(error);
            });
        };
        fetchAndSet();
    }, []);

    return (
        <div className={[styles.LayoutDiv, styles.CenteredH].join(' ')}>
            <Nav/>
            <Kalendar/>
        </div>
    );
}

export default Frontside;