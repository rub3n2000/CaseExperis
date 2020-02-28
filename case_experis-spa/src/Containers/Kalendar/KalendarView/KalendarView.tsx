import React from 'react';

import styles from './KalendarView.module.scss';

const kalendarView = ( props: any ) => {

    const FormatDateString = (date: string) => {
        let formatedDate = date.substring(0,10);
        return formatedDate;
    }
    console.log(Array.isArray(props.ferierForView.Wednesday));
    
    let mondayDivs = Array.isArray(props.ferierForView.Monday)?props.ferierForView.Monday.map((ferie: any, index: any) => {
        return(
            <div key={"Monday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let tuesdayDivs = Array.isArray(props.ferierForView.Tuesday)?props.ferierForView.Tuesday.map((ferie: any, index: any) => {
        return(
            <div key={"Tuesday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let wednesdayDivs = (typeof props.ferierForView.Wednesday) !== 'string'?props.ferierForView.Wednesday.map((ferie: any, index: any) => {
        return(
            <div key={"Wednesday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let thursdayDivs = (typeof props.ferierForView.Thursday) !== 'string'?props.ferierForView.Thursday.map((ferie: any, index: any) => {
        return(
            <div key={"Thursday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let fridayDivs = (typeof props.ferierForView.Friday) !== 'string'?props.ferierForView.Friday.map((ferie: any, index: any) => {
        return(
            <div key={"Friday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let saturdayDivs = (typeof props.ferierForView.Saturday) !== 'string'?props.ferierForView.Saturday.map((ferie: any, index: any) => {
        return(
            <div key={"Saturday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let sundayDivs = (typeof props.ferierForView.Sunday) !== 'string'?props.ferierForView.Sunday.map((ferie: any, index: any) => {
        return(
            <div key={"Sunday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;

    return (
        <div className={styles.KalendarView}>
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