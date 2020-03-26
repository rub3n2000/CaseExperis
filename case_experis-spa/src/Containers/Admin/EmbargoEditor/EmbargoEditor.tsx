import React from 'react';

import classes from './EmbargoEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const embargoEditor = ( props: any ) => {

    const languageTable = {
        Norwegian: {
        EditorLabel: "Rediger Feriefri Sone",
        NewLabel: "Lag Ny Feriefri Sone",
        DateLabel: "Dato",
        SaveEmbargo: "Lagre Feriefri Sone",
        DeleteEmbargo: "Slett Feriefri Sone"
        
        },
        English: {
        EditorLabel: "Edit Embargo",
        NewLabel: "Make New Embargo",
        DateLabel: "Dato",
        SaveEmbargo: "Save Embargo",
        DeleteEmbargo: "Delete Embargo"
        }
};


    let theLabel = props.newMode?<>{props.language === "Norwegian"?languageTable.Norwegian.NewLabel:languageTable.English.NewLabel}</>:
    <>{props.language === "Norwegian"?languageTable.Norwegian.EditorLabel:languageTable.English.EditorLabel}</>;
    let idLabel = <label> 
    Id
    <input type="number" defaultValue={props.embargo?props.embargo.id:""} readOnly/>
    </label>;

    const FormatDateAsMonthDayYearString = (date: Date) => {
    var removeDayName = date.toISOString().substring(0,10);
    return removeDayName;
    }

    const FormatDateAsDateString = (date: string) => {
        let dateString = date.substring(0,10);
        return dateString;
    }

    if(!props.embargo) {
        idLabel = <></>;
    }
    if(props.visible)
    {
        return(
            <div className={classes.EmbargoEditorComponent}>
            <div className={classes.EmbargoEditorForm}>
                {theLabel}
                <form onSubmit={props.NewEmbargo}>
                <div className={classes.EmbargoEditorInfo}>
                {idLabel}
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.DateLabel:languageTable.English.DateLabel}
                    <input type="date" defaultValue={props.embargo?FormatDateAsDateString(props.embargo.date):FormatDateAsMonthDayYearString(new Date())} onChange={props.embargoDateChangeHandler}/>
                </label>
                </div>
                <div className={classes.EmbargoEditorButtons}>
                <div className={classes.SaveEmbargoButton}> 
                    <button type="submit"> <FontAwesomeIcon icon={faSave}/> {props.language === "Norwegian"?languageTable.Norwegian.SaveEmbargo:languageTable.English.SaveEmbargo} </button>
                </div>
                <div className={classes.DeleteEmbargoButton}> 
                <button onClick={props.deleteEmbargo}>{props.language === "Norwegian"?languageTable.Norwegian.DeleteEmbargo:languageTable.English.DeleteEmbargo}</button>
                </div>
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

export default embargoEditor;