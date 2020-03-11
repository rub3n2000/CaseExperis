import React, { useState, useEffect } from 'react';

import styles from './Admin.module.scss';
import Employees from './Employees/Employees';
import Kalendar from '../Kalendar/Kalendar';
import Nav from '../Nav/Nav';
import axios from '../../axios-api';

const Admin = ( props: any ) => {

    type user = {
        id: number,
        fornavn: string,
        etternavn: string,
        telefonNummer: string,
        email: string,
        antallFerieTatt: number,
        antallFerieIgjen: number,
        languageCode: string,
        ferier: object
    }

    type users = user[] | undefined;

    const FetchUsers = async() => {
        let users: Partial<users> = [];
        await axios.get<users>("/users").then(response => {
            users = response.data;
        }).catch((error) => {console.log(error);});
        return users;
    };

    const [users, setUsers] = useState<users>();

    useEffect(() => {
        const SetTheUsers = async() => {
            var users = await FetchUsers();
            setUsers(users as users);
        };
        SetTheUsers();    
    }, [])

    

    return (
        <div className={styles.AdminDiv}>
            <Nav/>
            {users && <Employees users={users}/>}
            <Kalendar vacationEdit adminKalender wishKalender/>
            <Kalendar vacationEdit adminKalender vacationKalender/>
        </div>
    )
}

export default Admin;