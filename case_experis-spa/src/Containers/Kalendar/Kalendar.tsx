import React, { useEffect, useState } from 'react';

import styles from './Kalendar.module.scss';
import KalendarKontroll from './KalendarKontroll/KalendarKontroll';
import KalendarView from './KalendarView/KalendarView';
import axios from '../../axios-api';
import { stringify } from 'querystring';

const Kalendar = ( props: any ) => {

    type ferie = {
        id: number,
        date: Date,
        isGodkjent: boolean,
        ansattNotat: string,
        adminNotat: string,
        navn: string,
        user: object
        };

    type ferier = [ferie]
    
    type ferierEtterDag = {
        Mandag: ferier,
        Tirsdag: ferier,
        Onsdag: ferier,
        Torsdag: ferier,
        Fredag: ferier,
        Lørdag: ferier,
        Søndag: ferier
    };

    type uke = {
        Mandag: string,
        Tirsdag: string,
        Onsdag: string,
        Torsdag: string,
        Fredag: string,
        Lørdag: string,
        Søndag: string
    };
    type dayofWeekInNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

    const FindDayOfWeekBasedOnDate = (date : Date, day: dayofWeekInNumber) => {
        var difference = day - date.getDay();
        return new Date(date.getFullYear(),
         date.getMonth(), date.getDate() + difference);
    }

    const FormatDateAsMonthDayYearString = (date: Date) => {
        var removeDayName = date.toDateString().substring(4);
        removeDayName = ReplaceAllWhiteSpaceWithBackSlashInString(removeDayName);
        return removeDayName;
    }

    const ReplaceAllWhiteSpaceWithBackSlashInString = (theString: string) => {
        let editetString = theString;
        for(let i = 0; i < theString.length; i++)
        {
            if(editetString.charAt(i) == " ")
            {
               editetString = ReplaceCharAtIndexInString(editetString, i, "/");
            }
        }
        return editetString;
    }

    const ReplaceCharAtIndexInString = (theString: string, index: number, theChar: string) => {
        return theString.substring(0,index) + theChar + theString.substring(index + 1);
    }

    const FetchFerier = async() => {
        let ferieKeys = Object.keys(valgtUke);
        let oppdaterteFerier = {};
        for(let key in ferieKeys)
        {
            await axios.get("/ferier?Date="+valgtUke[ferieKeys[key] as keyof uke]).then(response => {
                oppdaterteFerier[ferieKeys[key] as keyof Object] = response.data;
            }).catch((error) => { console.log(error); });
        }
        return oppdaterteFerier as ferierEtterDag;
    }

    const dagEndretHandler = (dag: Date) => {
        setValgtDag(FormatDateAsMonthDayYearString(dag));
    }
    
    const [ferier, setFerier] = useState<ferierEtterDag>();
    const [valgtDag, setValgtDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));
    const [valgtUke, setValgtUke] = useState<uke>({
        Mandag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 1)),
        Tirsdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 2)),
        Onsdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 3)),
        Torsdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 4)),
        Fredag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 5)),
        Lørdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 6)),
        Søndag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 7))
    });

    useEffect(() => {
        const SetFeriene = async() => {
            var feriene = await FetchFerier();
            setFerier(feriene);
        }
        SetFeriene();
    }, []);

    useEffect(() => {
        const SetFeriene = async() => {
            var feriene = await FetchFerier();
            setFerier(feriene);
        }
        SetFeriene();
    }, [valgtUke]);
    
    useEffect(() => {
        setValgtUke({
            Mandag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 1)),
            Tirsdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 2)),
            Onsdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 3)),
            Torsdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 4)),
            Fredag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 5)),
            Lørdag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 6)),
            Søndag: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 7))
        });
    },[valgtDag]);

    return (
        <div className={[styles.Kalandar, styles.CenteredH].join(' ')}>
            <KalendarKontroll dag={valgtDag} dagEndretHandler={dagEndretHandler}/>
            <KalendarView feriene={ferier}/>
        </div>
    );
}

export default Kalendar;