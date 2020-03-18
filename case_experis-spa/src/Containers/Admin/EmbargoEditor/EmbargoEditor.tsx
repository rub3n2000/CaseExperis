import React from 'react';

import classes from './EmbargoEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const embargoEditor = ( props: any ) => {
    let theLabel = props.newMode?<>New Embargo</>:<>Edit Embargo</>;
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
                    Dato
                    <input type="date" defaultValue={props.embargo?FormatDateAsDateString(props.embargo.date):FormatDateAsMonthDayYearString(new Date())} onChange={props.embargoDateChangeHandler}/>
                </label>
                </div>
                <div className={classes.EmbargoEditorButtons}>
                <div className={classes.SaveEmbargoButton}> 
                    <button type="submit"> <FontAwesomeIcon icon={faSave}/> Save Embargo </button>
                </div>
                <div className={classes.DeleteEmbargoButton}> 
                <button onClick={props.deleteEmbargo}>Delete Embargo</button>
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