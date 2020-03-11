import React, { useState, useEffect } from 'react';
import classes from './VacationWishEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey, faComment, faCalendarMinus, faCalendarPlus, faSave, faStop, faCommentSlash, faUserAlt } from '@fortawesome/free-solid-svg-icons'; 
import Nav from '../Nav/Nav';
import axios from '../../axios-api';
import AuthenticationService from '../../Helpers/AuthenticationService';

const VacationWishEditor = ( props: any ) => {

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
    type responseFilter = any | undefined;

    const FormatDateAsMonthDayYearString = (date: Date) => {
        var removeDayName = date.toLocaleDateString(); // gives format that api cant use, but cant use toISO coz gives wrong dates coz timezone. Find solution?
        removeDayName = ReplaceAllDotsWithBackSlashInString(removeDayName);
        return removeDayName;
    }

    const ReplaceAllDotsWithBackSlashInString = (theString: string) => {
        let editetString = theString;
        for(let i = 0; i < theString.length; i++)
        {
            if(editetString.charAt(i) == ".")
            {
               editetString = ReplaceCharAtIndexInString(editetString, i, "/");
            }
        }
        return editetString;
    }

    const ReplaceCharAtIndexInString = (theString: string, index: number, theChar: string) => {
        return theString.substring(0,index) + theChar + theString.substring(index + 1);
    }

    const FormatDateString = (date: string) => {
        let formatedDate = date.substring(0,10);
        return formatedDate;
    }

    const deleteVacation = async () => {
        if(props.editMode)
        {
        const response = await axios.delete("/ferier/"+props.ferie.id, {headers: { Authorization: "Bearer " + localStorage.getItem("access_token")}});
        if(response.status as number == 200)
        {
            props.close()
            return true;
        }
        else {
            return false;
        }
        }
        else return false;
    }

    const AddDays = (currentDate: Date, days: any) => {
        var date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        return date;
    }

    const Getdates = (startDate: Date, stopDate: Date) => {
        var dateArray = new Array();
        var currentDate = startDate;
        while(currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = AddDays(currentDate, 1);
        }
        return dateArray;
    }

    const PostOrPutWish = async(user : any) => {
        if(user && user.id) {
            let dates = Getdates(new Date(fromDag), new Date(toDag));
            console.log(dates);
            console.log(FormatDateAsMonthDayYearString(dates[0]));
            const dayDiff = ((new Date(toDag).getTime() - new Date(fromDag).getTime()) / (1000 * 3600 * 24)) + 1;
            for(let i = 0; i < dayDiff; i++)
            {
                try
                {
                    const res = await axios.get("/ferier/user/"+user.id+"?Date="+FormatDateAsMonthDayYearString(dates[i]));
                    console.log(res);
                    if(res.status as number == 200) {
                        const putString = "/ferier/"+String(Array.isArray(res.data)?res.data[0].id:res.data.id);
                        try
                        {
                            const putRes = await axios.put(putString, {
                                Date: dates[i],
                                isGodkjent: false,
                                AnsattNotat: note,
                                AdminNotat: ""
                            }, {headers: { Authorization: "Bearer " + localStorage.getItem("access_token")}});
                            const getRes = await axios.get(putString);
                            console.log(getRes);
                            console.log(putString);
                        }
                        catch(e)
                        {
                            setFeedback(<div className={classes.Failure}>Something Went Wrong</div>);
                            console.log(e);
                        }
                    } else {
                        try
                        {
                            await axios.post("/ferier/new/"+String(user?user.id: 1), {
                               Date: dates[i],
                               AnsattNotat: note,
                               AdminNotat: "",
                               User: user,
                               UserId: user?user.id:1
                           },{headers: { Authorization: "Bearer " + localStorage.getItem("access_token")}});
                        }
                        catch(e)
                        {
                            setFeedback(<div className={classes.Failure}>Something Went Wrong</div>);
                            console.log(e);
                            return false;
                        }
                    }
                }
                catch(e)
                {
                    setFeedback(<div className={classes.Failure}>Something Went Wrong</div>);
                    console.log(e);
                    return false;
                }
            }
        }
        else {
            console.log("failed");
            return false;
        }
        return true;
    }

    const NewWish = async (evt: any) => {
        evt.preventDefault();
        let user = await AuthenticationService.fetchCurrentUser();
        if(props.admin && props.ferie) {
            user = props.ferie.user;
            console.log(user);
        }
        const check = await PostOrPutWish(user);
        if(check)
        {
            setNote("");
            setFromDag(FormatDateAsMonthDayYearString(new Date()));
            setToDag(FormatDateAsMonthDayYearString(new Date()));
            props.close();
            return true;
        }
        return false;
    }

    const noteChangeHandler = (evt: any) => {
        setNote(evt.target.value);
    }


    const toDagEndretHandler = (evt : any) => {
        if(evt.target.value != "")
        {
            setToDag(evt.target.value);
        }
    }

    const fromDagEndretHandler = (evt : any) => {
        if(evt.target.value != "")
        {
            setFromDag(evt.target.value);
        }
    }

    const makeAccepted = async () => {
        if(props.editMode && props.admin)
        {
        const response = await axios.patch("/ferier/"+props.ferie.id, {headers: { Authorization: "Bearer " + localStorage.getItem("access_token")}});
        if(response.status as number == 200)
        {
            props.close()
            return true;
        }
        else {
            return false;
        }
        }
        else return false;
    }

    const[note, setNote] = useState("");
    const[feedback, setFeedback] = useState(<div></div>);
    const[fromDag, setFromDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));
    const[toDag, setToDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));

    useEffect(() => {
        if(props.ferie) {
        console.log("hey listen");
        setFromDag(props.ferie.date);
        setToDag(props.ferie.date);
        setNote(props.ferie.ansattNotat);
        }
    }, [props.ferie])
    
    let deleteDiv = <></>;
    if(props.editMode) {
         deleteDiv = <div className={classes.DeleteVacationWishButton}> 
        <button onClick={deleteVacation}>Delete Vacation</button>
        </div>;
    }
    
    let name = props.admin?<label><FontAwesomeIcon icon={faUserAlt}/> {props.ferie.user.fornavn} {props.ferie.user.etternavn} </label>: <></>;
    let theLabel = props.wishKalender?<>Vacation Wish Editor</>:<>Vacation Editor</>;
    let makeAcceptedDiv = <></>;
    if(props.admin) {
        makeAcceptedDiv = <div className={classes.MakeAcceptedButton}> 
        <button onClick={makeAccepted}>Make Vacation Accepted</button>
        </div>;
    }
    if(props.visible)
    {
        return(
            <div className={classes.WishEditorComponent}>
            {feedback}
            <div className={classes.WishEditorForm}>
                {theLabel}
                <form onSubmit={NewWish}>
                <div className={classes.WishEditorInfo}>
                {name}
                <label>
                    <FontAwesomeIcon icon={faComment}/>Note
                    <textarea maxLength={160} defaultValue={props.editMode?props.ferie.ansattNotat:""} onChange={noteChangeHandler} required>

                    </textarea>
                </label>
                </div>
                <div className={classes.WishEditorDates}>
                <label>
                <FontAwesomeIcon icon={faCalendarMinus}/> From <input type="date"  name="fromDate" defaultValue={props.editMode?FormatDateString(props.ferie.date):FormatDateAsMonthDayYearString(new Date())} onChange={fromDagEndretHandler}></input>
                </label>
                <label>
                <FontAwesomeIcon icon={faCalendarPlus}/> To <input type="date" name="toDate" defaultValue={props.editMode?FormatDateString(props.ferie.date):FormatDateAsMonthDayYearString(new Date())} onChange={toDagEndretHandler}></input>
                </label>
                </div>
                <div className={classes.WishEditorButtons}>
                <div className={classes.SaveVacationWishButton}> 
                    <button type="submit"> <FontAwesomeIcon icon={faSave}/> Save Vacation </button>
                </div>
                {deleteDiv}
                {makeAcceptedDiv}
                </div>
                </form>
            </div>
        </div>
        );
    }
    else {
        return(<></>)
    }
}

export default VacationWishEditor;