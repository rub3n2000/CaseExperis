import React from 'react';

import styles from './KalendarView.module.scss';

const kalendarView = ( props: any ) => {

    type uke = {
        Monday: string,
        Tuesday: string,
        Wednesday: string,
        Thursday: string,
        Friday: string,
        Saturday: string,
        Sunday: string
    };

    const FormatDateString = (date: string) => {
        let formatedDate = date.substring(0,10);
        return formatedDate;
    }

    let ferier = props.ferierForView;

    if(props.wishKalender == true)
    {
       let ferierKeys = Object.keys(ferier) as (keyof uke)[];
       for(let k in ferierKeys)
       {
           if(Array.isArray(ferier[ferierKeys[k]]))
           {
            ferier[ferierKeys[k]] = ferier[ferierKeys[k]].filter((ferie: any) => ferie.isGodkjent == false);
           }
       }
    }

    if(props.vacationKalender == true)
    {
        let ferierKeys = Object.keys(ferier) as (keyof uke)[];
        for(let k in ferierKeys)
        {
            if(Array.isArray(ferier[ferierKeys[k]]))
            {
             ferier[ferierKeys[k]] = ferier[ferierKeys[k]].filter((ferie: any) => ferie.isGodkjent == true);
            }
        } 
    }
    
    let mondayDivs = Array.isArray(ferier.Monday)?props.ferierForView.Monday.map((ferie: any, index: any) => {
        return(
            <div key={"Monday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let tuesdayDivs = Array.isArray(ferier.Tuesday)?props.ferierForView.Tuesday.map((ferie: any, index: any) => {
        return(
            <div key={"Tuesday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let wednesdayDivs = Array.isArray(ferier.Wednesday)?props.ferierForView.Wednesday.map((ferie: any, index: any) => {
        return(
            <div key={"Wednesday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let thursdayDivs = Array.isArray(ferier.Thursday)?props.ferierForView.Thursday.map((ferie: any, index: any) => {
        return(
            <div key={"Thursday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let fridayDivs = Array.isArray(ferier.Friday)?props.ferierForView.Friday.map((ferie: any, index: any) => {
        return(
            <div key={"Friday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let saturdayDivs = Array.isArray(ferier.Saturday)?props.ferierForView.Saturday.map((ferie: any, index: any) => {
        return(
            <div key={"Saturday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let sundayDivs = Array.isArray(ferier.Sunday)?props.ferierForView.Sunday.map((ferie: any, index: any) => {
        return(
            <div key={"Sunday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;

    

    return (
        <div className={props.wishKalender || props.vacationKalender?styles.SmallKalendarView: styles.KalendarView}>
            <div className={styles.Days}>
                <div>
                    <div className={styles.Label}>
                        Søndag
                    </div>
                    <div className={styles.VacationItem}>
                        {sundayDivs}
                    </div>
                </div>
                <div>
                    <div className={styles.Label}>
                        Mandag
                    </div>
                    <div className={styles.VacationItem}>
                        {mondayDivs}
                    </div>
                </div>
                <div>
                    <div className={styles.Label}>
                        Tirsdag
                    </div>
                    <div className={styles.VacationItem}>
                        {tuesdayDivs}
                    </div>
                </div>
                <div>
                    <div className={styles.Label}>
                        Onsdag
                    </div>
                    <div className={styles.VacationItem}>
                        {wednesdayDivs}
                    </div>
                </div>
                <div>
                    <div className={styles.Label}>
                        Torsdag
                    </div>
                    <div className={styles.VacationItem}>
                        {thursdayDivs}
                    </div>
                </div>
                <div>
                    <div className={styles.Label}>
                        Fredag
                    </div>
                    <div className={styles.VacationItem}>
                        {fridayDivs}
                    </div>
                </div>
                <div>
                    <div className={styles.Label}>
                        Lørdag
                    </div>
                    <div className={styles.VacationItem}>
                        {saturdayDivs}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default kalendarView;