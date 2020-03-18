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

    if(props.vacationKalender == true || props.godkjentOnly)
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
            <div onClick={() => props.ferieClickHandler("Monday", index)} key={"Monday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let tuesdayDivs = Array.isArray(ferier.Tuesday)?props.ferierForView.Tuesday.map((ferie: any, index: any) => {
        return(
            <div onClick={() => props.ferieClickHandler("Tuesday", index)} key={"Tuesday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let wednesdayDivs = Array.isArray(ferier.Wednesday)?props.ferierForView.Wednesday.map((ferie: any, index: any) => {
        return(
            <div onClick={() => props.ferieClickHandler("Wednesday", index)} key={"Wednesday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let thursdayDivs = Array.isArray(ferier.Thursday)?props.ferierForView.Thursday.map((ferie: any, index: any) => {
        return(
            <div onClick={() => props.ferieClickHandler("Thursday", index)} key={"Thursday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let fridayDivs = Array.isArray(ferier.Friday)?props.ferierForView.Friday.map((ferie: any, index: any) => {
        return(
            <div onClick={() => props.ferieClickHandler("Friday", index)} key={"Friday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let saturdayDivs = Array.isArray(ferier.Saturday)?props.ferierForView.Saturday.map((ferie: any, index: any) => {
        return(
            <div onClick={() => props.ferieClickHandler("Saturday", index)} key={"Saturday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;
    let sundayDivs = Array.isArray(ferier.Sunday)?props.ferierForView.Sunday.map((ferie: any, index: any) => {
        return(
            <div onClick={() => props.ferieClickHandler("Sunday", index)} key={"Sunday" + index}>{ferie.navn} {FormatDateString(ferie.date)}</div>
        );
    }): null;

    if(props.embargoes) {
        if(props.embargoes.Monday) {
            mondayDivs = Array.isArray(props.embargoes.Monday)?props.embargoes.Monday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Monday", index)} key={"Monday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Monday", 0)} key={"Monday" + 0}>EMBARGO {FormatDateString(props.embargoes.Monday.date)}</div>;
        }
        if(props.embargoes.Tuesday) {
            tuesdayDivs = Array.isArray(props.embargoes.Tuesday)?props.embargoes.Tuesday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Tuesday", index)} key={"Tuesday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Tuesday", 0)} key={"Tuesday" + 0}>EMBARGO {FormatDateString(props.embargoes.Tuesday.date)}</div>;
        }
        if(props.embargoes.Wednesday) {
            wednesdayDivs = Array.isArray(props.embargoes.Wednesday)?props.embargoes.Wednesday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Wednesday", index)} key={"Wednesday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Wednesday", 0)} key={"Wednesday" + 0}>EMBARGO {FormatDateString(props.embargoes.Wednesday.date)}</div>;
        }
        if(props.embargoes.Thursday) {
            thursdayDivs = Array.isArray(props.embargoes.Thursday)?props.embargoes.Thursday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Thursday", index)} key={"Thursday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Thursday", 0)} key={"Thursday" + 0}>EMBARGO {FormatDateString(props.embargoes.Thursday.date)}</div>;
        }
        if(props.embargoes.Friday) {
            fridayDivs = Array.isArray(props.embargoes.Friday)?props.embargoes.Friday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Friday", index)} key={"Friday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Friday", 0)} key={"Friday" + 0}>EMBARGO {FormatDateString(props.embargoes.Friday.date)}</div>;
        }
        if(props.embargoes.Saturday) {
            saturdayDivs = Array.isArray(props.embargoes.Saturday)?props.embargoes.Saturday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Saturday", index)} key={"Saturday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Wednesday", 0)} key={"Wednesday" + 0}>EMBARGO {FormatDateString(props.embargoes.Wednesday.date)}</div>;
        }
        if(props.embargoes.Sunday) {
            sundayDivs = Array.isArray(props.embargoes.Sunday)?props.embargoes.Sunday.map((embargo: any, index: any) => {
                return(
                    <div onClick={() => props.embargoClickHandler("Sunday", index)} key={"Sunday" + index}>EMBARGO {FormatDateString(embargo.date)}</div>
                );
            }): <div onClick={() => props.embargoClickHandler("Sunday", 0)} key={"Sunday" + 0}>EMBARGO {FormatDateString(props.embargoes.Sunday.date)}</div>;
        }
    }

    

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