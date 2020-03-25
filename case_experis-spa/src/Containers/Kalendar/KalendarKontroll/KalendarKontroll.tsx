import React from 'react';

import styles from './KalendarKontroll.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey, faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { withRouter } from 'react-router-dom';

const kalendarKontroll = ( props: any ) => {

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
        userSelect = <> </>;
    }

    let Label = <div className={styles.Label}></div>;
    let newWish = null;
    
    if(props.wishKalender)
    {
        Label = <div className={styles.Label}>
        <div>Ferie Ønsker</div>
        </div>;
        if(!props.adminKalender)
        {
         newWish = <label onClick={props.newVacationWishHandler} className={styles.NewVacationWish}>
             <FontAwesomeIcon  icon={faPlus}/> Ny Ferie
         </label>;
        }
        else {
            newWish = <label onClick={props.newEmbargoHandler} className={styles.NewVacationWish}>
            <FontAwesomeIcon  icon={faPlus}/> Ny Embargo
        </label>;
        }
    }
    else if(props.vacationKalender)
    {
        Label = <div className={styles.Label}>Godkjente Ferier</div>
    } 
    else {
        Label = <></>;
    }

    return (
        <>
        {Label}
        <div className={props.wishKalender || props.vacationKalender?styles.SmallKalendarKontroll: styles.KalendarKontroll}>
           {userSelect}
            <label>
            Date <input type="date" name="date" defaultValue={props.dag} onChange={props.dagEndretHandler}></input>
            </label>
            {newWish}
        </div>
        </>
    )
}

export default withRouter(kalendarKontroll);