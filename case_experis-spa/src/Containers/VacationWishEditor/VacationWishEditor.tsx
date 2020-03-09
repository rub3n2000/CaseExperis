import React, { useState } from 'react';
import classes from './VacationWishEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'; 
import Nav from '../Nav/Nav';
import { withRouter } from 'react-router-dom';
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
        var removeDayName = date.toISOString().substring(0,10);
        return removeDayName;
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
                    const res = await axios.get("/ferier/user/"+user.id+"?Date="+FormatDateAsMonthDayYearString(dates[i]));
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
        const check = await PostOrPutWish(user);
        if(check)
        {
            setLanguage("");
            setNote("");
            setFromDag(FormatDateAsMonthDayYearString(new Date()));
            setToDag(FormatDateAsMonthDayYearString(new Date()));
            props.history.push("/profile");
            return true;
        }
        return false;
    }

    const languageChangeHandler = (evt: any) => {
        setLanguage(evt.target.value);
    }

    const noteChangeHandler = (evt: any) => {
        setNote(evt.target.value);
    }

    const CancelHandler = (evt: any) => {
        props.history.replace("/profile");
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

    const[language, setLanguage] = useState("");
    const[note, setNote] = useState("");
    const[feedback, setFeedback] = useState(<div></div>);
    const[fromDag, setFromDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));
    const[toDag, setToDag] = useState<string>(FormatDateAsMonthDayYearString(new Date()));

    let deleteDiv = <></>;
    if(props.EditMode) {
        let deleteDiv = <div className={classes.DeleteVacationWishEditor}> 
        <button>Delete VacationWish</button>
        </div>;
    } 
    
    return(
        <div className={classes.WishEditorComponent}>
        <Nav/>
        {feedback}
        <div className={classes.WishEditorForm}>
            Wish Editor
            <form onSubmit={NewWish}>
            <div className={classes.WishEditorInfo}>
            <label>
            <FontAwesomeIcon icon={faAt}/> Language 
            <select onChange={languageChangeHandler}>
                <option>Norsk</option>
                <option>English</option>
            </select>
            </label>
            <label>
                Note
                <textarea onChange={noteChangeHandler} required>

                </textarea>
            </label>
            </div>
            <div className={classes.WishEditorDates}>
            <label>
            From <input type="date" name="fromDate" defaultValue={fromDag} onChange={fromDagEndretHandler}></input>
            </label>
            <label>
            To <input type="date" name="toDate" defaultValue={toDag} onChange={toDagEndretHandler}></input>
            </label>
            </div>
            <div className={classes.WishEditorButtons}>
            <div className={classes.SaveVacationWishButton}> 
                <button type="submit">Save Vacation Wish</button>
            </div>
            <div className={classes.CancelVacationWishButton}> 
                <button onClick={CancelHandler}>Cancel</button>
            </div>
            {deleteDiv}
            </div>
            </form>
        </div>
    </div>
    );
}

export default withRouter(VacationWishEditor);