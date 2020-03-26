import React from 'react';
import styles from './DetailedView.module.scss';
import { faLanguage, faUserAlt, faComment, faUserShield, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const detailedView = ( props: any ) => {
    const FormatDateString = (date: string) => {
        let formatedDate = date.substring(0,10);
        return formatedDate;
    }

    const languageTable = {
        Norwegian: {
        LanguageLabel: "Språk",
        EmployeeNoteLabel: "Ansatt Notat",
        AdminNoteLabel: "Admin Notat",
        DateLabel: "Dato"
        },
        English: {
        LanguageLabel: "Language",
        EmployeeNoteLabel: "Employee Note",
        AdminNoteLabel: "Admin Note",
        DateLabel: "Date"
        }
};
    
    if (props.visible) {
        return(
            <div className={styles.DetailedView}>
                <div>{props.language === "Norwegian"?languageTable.Norwegian.LanguageLabel:languageTable.English.LanguageLabel} 
                <FontAwesomeIcon icon={faLanguage}/> {props.ferie.user.languageCode}</div>
                <div>{props.language === "Norwegian"?languageTable.Norwegian.EmployeeNoteLabel:languageTable.English.EmployeeNoteLabel} 
                <FontAwesomeIcon icon={faUserAlt}/> <FontAwesomeIcon icon={faComment}/> {props.ferie.ansattNotat}</div>
                <div>{props.language === "Norwegian"?languageTable.Norwegian.AdminNoteLabel:languageTable.English.AdminNoteLabel} 
                <FontAwesomeIcon icon={faUserShield}/> <FontAwesomeIcon icon={faComment}/> {props.ferie.adminNotat}</div>
                <div>{props.language === "Norwegian"?languageTable.Norwegian.DateLabel:languageTable.English.DateLabel} 
                <FontAwesomeIcon icon={faCalendarDay}/> <input type="date" value={FormatDateString(props.ferie.date)} readOnly/></div>
            </div>
        );
    }
    else {
        return(
            <></>
        );
    }
}

export default detailedView;