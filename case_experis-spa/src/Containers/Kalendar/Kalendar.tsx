import React, { useEffect, useState, Key } from 'react';

import styles from './Kalendar.module.scss';
import KalendarKontroll from './KalendarKontroll/KalendarKontroll';
import KalendarView from './KalendarView/KalendarView';
import axios from '../../axios-api';
import { stringify } from 'querystring';
import DetailedView from './DetailedView/DetailedView';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';
import VacationWishEditor from '../VacationWishEditor/VacationWishEditor';

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
    type embargoesEtterDag = { [k in keyof uke]: embargoesFilter };

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

    type embargo = {
        id: number,
        date: Date
    }

    type embargoes = embargo[];

    type embargoFilter = embargo | undefined;
    type embargoesFilter = embargoes | undefined;

    type userFilter = user | undefined;

    type users = user[];

    type ferieFilter = ferie | undefined;

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
            }).catch((error) => { console.log(error); props.setErrorMessage("Vacations couldn't be fetched. Try again later, and contact support if problem continues.") });
        }
        return oppdaterteFerier as ferierEtterDag;
    }

    const FetchEmbargoes = async() => {
        let ukeKeys = Object.keys(valgtUke) as (keyof uke)[];
        let oppdaterteEmbargoes: Partial<ferierEtterDag> = {};
        for(let key in ukeKeys)
        {
            await axios.get<ferier>("/embargo?Date="+valgtUke[ukeKeys[key]]).then(response => {
                oppdaterteEmbargoes[ukeKeys[key]] = response.data; 
            }).catch((error) => { console.log(error); props.setErrorMessage("Embargoes couldn't be fetched. Try again later, and contact support if problem continues.") });
        }
        return oppdaterteEmbargoes as embargoesEtterDag;
    }

    const FetchAndSetFerierOneUser = async(user: user) => {
        let ferieKeys = Object.keys(valgtUke) as (keyof uke)[];
        let oppdaterteFerier: Partial<ferierEtterDag> = {};
        for(let key in ferieKeys)
        {
            await axios.get<ferier>("/ferier/user/"+user.id+"?Date="+valgtUke[ferieKeys[key]]).then(response => {
                oppdaterteFerier[ferieKeys[key]] = response.data;
            }).catch((error) => { console.log(error); props.setErrorMessage("Finding this users vacations failed. Try again later, and contact support if problem continues.")}); 
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
            let user = users?users.find((user : any) => user.fornavn + " " + user.etternavn == evt.target.value):undefined;
            setCurrentUserFilter(user);
        }
        else {
            setCurrentUserFilter(undefined);
        }
    }

    const ferieClickHandler = (dag: string, index:  number) => {
        if(props.vacationEdit)
        {
            setEditor(ferier?ferier[dag as keyof ferierEtterDag][index]:undefined);
            setEditorVisible(true);
            setNewVacation(false);
        }
        else {
            setDetailedView(ferier?ferier[dag as keyof ferierEtterDag][index]: undefined);
            setDetailedVisible(true);
        }
    }

    const embargoClickHandler = (dag: string, index:  number) => {
        if(props.adminKalender)
        {
            if(embargoes)
            {
                if(embargoes[dag as keyof embargoesEtterDag]) {
                    props.setEmbargo((embargoes[dag as keyof embargoesEtterDag] as any)[index]);
                }
                else {
                    props.setEmbargo(undefined);
                }
            }
        }
    }

    const ferieClickHandlerNew = () => {
        if(props.vacationEdit)
        {
            setEditor(undefined);
            setEditorVisible(true);
            setNewVacation(true);
        }
    }

    const ferieDetailedClose = () => {
        if(props.vacationEdit)
        {
            setEditorVisible(false);
        }
        else {
        setDetailedVisible(false);
        }
    }

    const FetchUsers = async() => {
        let users: Partial<users> = [];
        await axios.get<users>("/users").then(response => {
            users = response.data;
        }).catch((error) => {console.log(error); props.setErrorMessage("Users couldn't be found. Try again later, and contact support if problem continues.")});
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
    const [detailedVisible, setDetailedVisible] = useState<boolean>(false);
    const [detailedView, setDetailedView] = useState<ferieFilter>();
    const [editor, setEditor] = useState<ferieFilter>();
    const [editorVisible, setEditorVisible] = useState(false);
    const [newVacation, setNewVacation] = useState(false);
    const [embargoes, setEmbargoes] = useState<embargoesEtterDag>();
   
    useEffect(() => {
        const SetEmbargoes = async() => {
            var embargoes = await FetchEmbargoes();
            setEmbargoes(embargoes);
        }
        SetEmbargoes();
        if(props.bruker == undefined)
        {
            setCurrentUserFilter(undefined);
        const SetFeriene = async() => {
            var feriene = await FetchFerier();
            setFerier(feriene);
        }
        SetFeriene();
        } else {
            FetchAndSetFerierOneUser(props.bruker);
        }
        const SetTheUsers = async() => {
            var users = await FetchUsers();
            setUsers(users as users);
        };
        SetTheUsers();
    }, []);

    useEffect(() => {
        const SetEmbargoes = async() => {
            var embargoes = await FetchEmbargoes();
            setEmbargoes(embargoes);
        }
        SetEmbargoes();
        if(props.bruker) {
            if(props.bruker == undefined) {
                const SetFeriene = async() => {
                    var feriene = await FetchFerier();
                    setFerier(feriene);
                }
                SetFeriene();
            }
            else {
                FetchAndSetFerierOneUser(props.bruker as user);
            }
        }
        else {
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
        }
        
    }, [JSON.stringify(valgtUke), JSON.stringify(currentUserFilter), JSON.stringify(editorVisible)]);
    
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

    let classes = [styles.Kalandar, styles.CenteredH];
    if(props.vacationKalender || props.wishKalender)
    {
        classes = [styles.SmallKalendar, styles.CenteredH];
    }
   
    return (
        <div className={classes.join(' ')}>
            <Backdrop show={detailedVisible || editorVisible} clicked={ferieDetailedClose}/>
            {users && <KalendarKontroll newVacationWishHandler={ferieClickHandlerNew} newEmbargoHandler={props.newEmbargoHandler} adminKalender={props.adminKalender} dag={valgtDag} dagEndretHandler={dagEndretHandler} brukere={users} brukerEndretHandler={brukerEndretHandler}
             user={props.bruker}  language={props.language} vacationKalender={props.vacationKalender} wishKalender={props.wishKalender} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            {ferier && <KalendarView embargoClickHandler={embargoClickHandler} embargoes={embargoes} ferieClickHandler={ferieClickHandler} ferierForView={ferier} wishKalender={props.wishKalender} 
            vacationKalender={props.vacationKalender} language={props.language} godkjentOnly={props.godkjentOnly} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            {ferier && detailedView &&  <DetailedView language={props.language} ferie={detailedView} visible={detailedVisible} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
            {ferier && (newVacation || editor) && <VacationWishEditor admin={props.adminKalender} wishKalender={props.wishKalender} close={ferieDetailedClose}
            editMode={!newVacation} ferie={editor} visible={editorVisible} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>}
        </div>
    );
}

export default Kalendar;