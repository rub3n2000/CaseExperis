import React from 'react';

import styles from './KalendarKontroll.module.scss';

const kalendarKontroll = ( props: any ) => {
   
    console.log(props.user);
    let userOptions = props.brukere.map((user: any) => {
        return(
            <option key={user.id} value={user.fornavn + " " + user.etternavn}>{user.fornavn} {user.etternavn}</option>
        )
    });
    let userSelect =  <label>
    User
    <select name="userSelect" onChange={props.brukerEndretHandler}>
        <option value="All">All</option>
        {userOptions}
    </select>
    </label>;
    if(props.user)
    {
        userSelect= <div></div>;
    }
    let Label = <div className={styles.Label}>
    
    </div>;
    if(props.wishKalender)
    {
        Label = <div className={styles.Label}>Ferie Ønsker</div>
    }
    if(props.vacationKalender)
    {
        Label = <div className={styles.Label}>Godkjente Ferier</div>
    } 
    return (
        <>
        {Label}
        <div className={props.wishKalender || props.vacationKalender?styles.SmallKalendarKontroll: styles.KalendarKontroll}>
           {userSelect}
            <label>
            Date
            <input type="date" name="date" defaultValue={props.dag} onChange={props.dagEndretHandler}></input>
            </label>
        </div>
        </>
    )
}

export default kalendarKontroll;