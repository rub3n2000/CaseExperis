import React, { useEffect, useState, Key } from 'react';

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

    type ferier = ferie[];

    type ferierEtterDag = { [k in keyof uke]: ferier };

    type uke = {
        Monday: string,
        Tuesday: string,
        Wednesday: string,
        Thursday: string,
        Friday: string,
        Saturday: string,
        Sunday: string
    };

    type dayofWeekInNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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

    type userFilter = user | undefined;

    type users = user[];

    const FindDayOfWeekBasedOnDate = (date : Date, day: dayofWeekInNumber) => {
        var difference = day - date.getDay();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + difference + 1);
    }

    const FormatDateAsMonthDayYearString = (date: Date) => {
        var removeDayName = date.toISOString().substring(0,10);
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
        let ferieKeys = Object.keys(valgtUke) as (keyof uke)[];
        let oppdaterteFerier: Partial<ferierEtterDag> = {};
        for(let key in ferieKeys)
        {
            await axios.get<ferier>("/ferier?Date="+valgtUke[ferieKeys[key]]).then(response => {
                oppdaterteFerier[ferieKeys[key]] = response.data;
            }).catch((error) => { console.log(error); });
        }
        return oppdaterteFerier as ferierEtterDag;
    }

    const FetchAndSetFerierOneUser = async(user: user) => {
        
        let ferieKeys = Object.keys(valgtUke) as (keyof uke)[];
        let oppdaterteFerier: Partial<ferierEtterDag> = {};
        for(let key in ferieKeys)
        {
            await axios.get<ferier>("/ferier/user/"+user.id+"?Date="+valgtUke[ferieKeys[key]]).then(response => {
                oppdaterteFerier[ferieKeys[key]] = response.data;
            }).catch((error) => { console.log(error);}); 
        }
        setFerier(oppdaterteFerier as ferierEtterDag);
    }

    const dagEndretHandler = (evt : any) => {
        if(evt.target.value != "")
        {
            setValgtDag(evt.target.value);
        }
    }

    const brukerEndretHandler = (evt: any) => {
        if(evt.target.value !== 'All')
        {
            let user = users?.find(user => user.fornavn + " " + user.etternavn == evt.target.value);
            setCurrentUserFilter(user);
        }
        else {
            setCurrentUserFilter(undefined);
        }
    }

    const FetchUsers = async() => {
        let users: Partial<users> = [];
        await axios.get<users>("/users").then(response => {
            users = response.data;
        }).catch((error) => {console.log(error);});
        return users;
    };
    
    const [ferier, setFerier] = useState<ferierEtterDag>();
    const [valgtDag, setValgtDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));
    const [valgtUke, setValgtUke] = useState<uke>({
        Sunday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 0)),
        Monday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 1)),
        Tuesday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 2)),
        Wednesday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 3)),
        Thursday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 4)),
        Friday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 5)),
        Saturday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(), 6))
    });
    const [users, setUsers] = useState<users>();
    const [currentUserFilter, setCurrentUserFilter] = useState<userFilter>();

    useEffect(() => {
        const SetFeriene = async() => {
            var feriene = await FetchFerier();
            setFerier(feriene);
        }
        SetFeriene();
        const SetTheUsers = async() => {
            var users = await FetchUsers();
            setUsers(users as users);
        };
        SetTheUsers();
    }, []);

    useEffect(() => {
        if(currentUserFilter == undefined) {
            const SetFeriene = async() => {
                var feriene = await FetchFerier();
                setFerier(feriene);
            }
            SetFeriene();
        }
        else {
            FetchAndSetFerierOneUser(currentUserFilter as user);
        }
    }, [valgtUke, currentUserFilter]);
    
    useEffect(() => {
        setValgtUke({
            Sunday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 0)),
            Monday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 1)),
            Tuesday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 2)),
            Wednesday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 3)),
            Thursday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 4)),
            Friday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 5)),
            Saturday: FormatDateAsMonthDayYearString(FindDayOfWeekBasedOnDate(new Date(valgtDag), 6))
            
        });
    },[valgtDag]);

    return (
        <div className={[styles.Kalandar, styles.CenteredH].join(' ')}>
            {users && <KalendarKontroll dag={valgtDag} dagEndretHandler={dagEndretHandler} brukere={users} brukerEndretHandler={brukerEndretHandler}/>}
            {ferier && <KalendarView ferierForView={ferier}/>}
        </div>
    );
}

export default Kalendar;