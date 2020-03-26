import React, { useState, useEffect } from 'react';
import classes from './VacationWishEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey, faComment, faCalendarMinus, faCalendarPlus, faSave, faStop, faCommentSlash, faUserAlt } from '@fortawesome/free-solid-svg-icons'; 
import Nav from '../Nav/Nav';
import axios from '../../axios-api';
import AuthenticationService from '../../Helpers/AuthenticationService';
import { withRouter } from 'react-router-dom';

const VacationWishEditor = ( props: any ) => {

    const FormatDateAsMonthDayYearString = (date: Date) => {
        var removeDayName = date.toLocaleDateString();
        removeDayName = ReplaceAllDotsWithBackSlashInString(removeDayName);
        removeDayName = ReverseDate(removeDayName);
        return removeDayName;
    }

    const ReverseDate = (theString: string) => {
        let editedString = theString;
        let backSlashIndices: number[]= [];
        let editedStringPieces : string[] = [];
        backSlashIndices.push(-1);
        for(let i = 0; i < theString.length; i++) {
            if(editedString.charAt(i) == "/") {
                backSlashIndices.push(i);
            }
        }
        for(let i = 0; i < backSlashIndices.length; i++) {
            editedStringPieces.push(editedString.substring(backSlashIndices[i] + 1, backSlashIndices[i + 1]));
        }

        editedString = editedStringPieces[2] + "/" + editedStringPieces[0] + "/" + editedStringPieces[1];


        return editedString;
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
            const dayDiff = ((new Date(toDag).getTime() - new Date(fromDag).getTime()) / (1000 * 3600 * 24)) + 1;
            for(let i = 0; i < dayDiff; i++)
            {
                try
                {
                    let token = "Bearer " + localStorage.getItem("access_token");
                    axios.defaults.headers.Authorization = token;
                    const res2 = await axios.get("/embargo?Date="+FormatDateAsMonthDayYearString(dates[i]));
                    console.log(res2);
                    if(res2.status === 204) {
                        const res = await axios.get("/ferier/user/"+user.id+"?Date="+FormatDateAsMonthDayYearString(dates[i]));
                        if(res.status as number == 200) {
                            const putString = "/ferier/"+String(Array.isArray(res.data)?res.data[0].id:res.data.id);
                            try
                            {
                                const putRes = await axios.put(putString, {
                                    Date: dates[i],
                                    isGodkjent: String(Array.isArray(res.data)?res.data[0].isGodkjent: res.data.isGodkjent),
                                    AnsattNotat: note,
                                    AdminNotat: adminNote
                                }, {headers: { Authorization: "Bearer " + localStorage.getItem("access_token")}});
                                const getRes = await axios.get(putString);
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
                                AdminNotat: adminNote,
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
        }
        const check = await PostOrPutWish(user);
        if(check)
        {
            setNote("");
            setFromDag(FormatDateAsMonthDayYearString(new Date()));
            setToDag(FormatDateAsMonthDayYearString(new Date()));
            props.close();
            props.history.go(0);
            return true;
        }
        return false;
    }

    const noteChangeHandler = (evt: any) => {
        setNote(evt.target.value);
    }

    const adminNoteChangeHandler = (evt: any) => {
        setAdminNote(evt.target.value);
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
            let token = "Bearer " + localStorage.getItem("access_token");
            axios.defaults.headers.Authorization = token;
            const response = await axios.patch("/ferier/"+props.ferie.id);
            if(response.status as number == 200)
            {
                props.close()
                console.log("WHat?");
                return true;
            }
            else {
                return false;
            }
        }
        else return false;
    }

    const[note, setNote] = useState("");
    const[adminNote, setAdminNote] = useState("");
    const[feedback, setFeedback] = useState(<div></div>);
    const[fromDag, setFromDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));
    const[toDag, setToDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));


    const languageTable = {
        Norwegian: {
        DeleteLabel: "Slett Ferie",
        MakeAcceptedLabel: "Gjør Ferie Godkjent",
        NoteLabel: "Notat",
        FromLabel: "Fra",
        ToLabel: "Til",
        SaveVacationLabel: "Lagre Ferie",
        VacationWishLabel: "Rediger Ferie Ønske",
        VacationLabel: "Rediger Ferie",
        AdminNoteLabel: "Admin Notat"
        },
        English: {
        DeleteLabel: "Delete Vacation",
        MakeAcceptedLabel: "Make Vacation Accepted",
        NoteLabel: "Note",
        FromLabel: "From",
        ToLabel: "To",
        SaveVacationLabel: "Save Vacation",
        VacationWishLabel: "Vacation Wish Editor",
        VacationLabel: "Vacation Editor",
        AdminNoteLabel: "Admin Note"
        }
    };


    useEffect(() => {
        if(props.ferie) {
        setFromDag(props.ferie.date);
        setToDag(props.ferie.date);
        setNote(props.ferie.ansattNotat);
        }
    }, [props.ferie])
    
    let deleteDiv = <></>;
    if(props.editMode) {
         deleteDiv = <div className={classes.DeleteVacationWishButton}> 
        <button onClick={deleteVacation}>{props.language === "Norwegian"?languageTable.Norwegian.DeleteLabel:languageTable.English.DeleteLabel}</button>
        </div>;
    }
    
    let name = props.admin?<label><FontAwesomeIcon icon={faUserAlt}/> {props.ferie.user.fornavn} {props.ferie.user.etternavn} </label>: <></>;
    let theLabel = props.wishKalender?<>{props.language === "Norwegian"?languageTable.Norwegian.VacationWishLabel:languageTable.English.VacationWishLabel}</>:
    <>{props.language === "Norwegian"?languageTable.Norwegian.VacationLabel:languageTable.English.VacationLabel}</>;
    let makeAcceptedDiv = <></>;
    if(props.admin) {
        makeAcceptedDiv = <div className={classes.MakeAcceptedButton}> 
        <button onClick={makeAccepted}>{props.language === "Norwegian"?languageTable.Norwegian.MakeAcceptedLabel:languageTable.English.MakeAcceptedLabel}</button>
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
                    <FontAwesomeIcon icon={faComment}/>{props.language === "Norwegian"?languageTable.Norwegian.AdminNoteLabel:languageTable.English.AdminNoteLabel}
                    <textarea maxLength={160} defaultValue={props.editMode?props.ferie.ansattNotat:""} onChange={noteChangeHandler} required>

                    </textarea>
                </label>
                <label>
                    <FontAwesomeIcon icon={faComment}/>{props.language === "Norwegian"?languageTable.Norwegian.AdminNoteLabel:languageTable.English.AdminNoteLabel}
                    <textarea maxLength={160} defaultValue={props.editMode?props.ferie.adminNotat:""} onChange={adminNoteChangeHandler} required>

                    </textarea>
                </label>
                </div>
                <div className={classes.WishEditorDates}>
                <label>
                <FontAwesomeIcon icon={faCalendarMinus}/> {props.language === "Norwegian"?languageTable.Norwegian.ToLabel:languageTable.English.ToLabel} 
                <input type="date"  name="fromDate" defaultValue={props.editMode?FormatDateString(props.ferie.date):FormatDateAsMonthDayYearString(new Date())} onChange={fromDagEndretHandler}></input>
                </label>
                <label>
                <FontAwesomeIcon icon={faCalendarPlus}/> {props.language === "Norwegian"?languageTable.Norwegian.FromLabel:languageTable.English.FromLabel} 
                <input type="date" name="toDate" defaultValue={props.editMode?FormatDateString(props.ferie.date):FormatDateAsMonthDayYearString(new Date())} onChange={toDagEndretHandler}></input>
                </label>
                </div>
                <div className={classes.WishEditorButtons}>
                <div className={classes.SaveVacationWishButton}> 
                    <button type="submit"> <FontAwesomeIcon icon={faSave}/> {props.language === "Norwegian"?languageTable.Norwegian.SaveVacationLabel:languageTable.English.SaveVacationLabel} </button>
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

export default withRouter(VacationWishEditor);