import React from 'react';

import styles from './KalendarKontroll.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey, faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { withRouter } from 'react-router-dom';

const kalendarKontroll = ( props: any ) => {

    const languageTable = {
        Norwegian: {
        SelectLabel: "Bruker",
        SelectAllLabel: "Alle",
        VacationWishLabel: "Ferie Ønsker",
        VacationLabel: "Godkjente Ferier",
        NewWishLabel: "Ny Ferie",
        NewEmbargoLabel: "Ny Feriefri Sone",
        DateLabel: "Dato"
        },
        English: {
        SelectLabel: "User",
        SelectAllLabel: "All",
        VacationWishLabel: "Vacation Wishes",
        VacationLabel: "Accepted Vacations",
        NewWishLabel: "New Vacation",
        NewEmbargoLabel: "New Embargo",
        DateLabel: "Date"
        }
    };

    let userOptions = props.brukere.map((user: any) => {
        return(
            <option key={user.id} value={user.fornavn + " " + user.etternavn}>{user.fornavn} {user.etternavn}</option>
        )
    });

    let userSelect =  <label>
    {props.language === "Norwegian"?languageTable.Norwegian.SelectLabel:languageTable.English.SelectLabel}
    <select name="userSelect" onChange={props.brukerEndretHandler}>
        <option value="All">{props.language === "Norwegian"?languageTable.Norwegian.SelectAllLabel:languageTable.English.SelectAllLabel}</option>
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
        <div>{props.language === "Norwegian"?languageTable.Norwegian.VacationWishLabel:languageTable.English.VacationWishLabel}</div>
        </div>;
        if(!props.adminKalender)
        {
         newWish = <label onClick={props.newVacationWishHandler} className={styles.NewVacationWish}>
             <FontAwesomeIcon  icon={faPlus}/> {props.language === "Norwegian"?languageTable.Norwegian.NewWishLabel:languageTable.English.NewWishLabel}
         </label>;
        }
        else {
            newWish = <label onClick={props.newEmbargoHandler} className={styles.NewVacationWish}>
            <FontAwesomeIcon  icon={faPlus}/> {props.language === "Norwegian"?languageTable.Norwegian.NewEmbargoLabel:languageTable.English.NewEmbargoLabel}
        </label>;
        }
    }
    else if(props.vacationKalender)
    {
        Label = <div className={styles.Label}>{props.language === "Norwegian"?languageTable.Norwegian.VacationLabel:languageTable.English.VacationLabel}</div>
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
            {props.language === "Norwegian"?languageTable.Norwegian.DateLabel:languageTable.English.DateLabel} <input type="date" name="date" defaultValue={props.dag} onChange={props.dagEndretHandler}></input>
            </label>
            {newWish}
        </div>
        </>
    )
}

export default withRouter(kalendarKontroll);