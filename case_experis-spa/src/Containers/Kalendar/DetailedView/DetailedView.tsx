import React from 'react';
import styles from './DetailedView.module.scss';
import { faLanguage, faUserAlt, faComment, faUserShield, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const detailedView = ( props: any ) => {
    const FormatDateString = (date: string) => {
        let formatedDate = date.substring(0,10);
        return formatedDate;
    }
    
    /*let ansattNotat = [];

    const len = 20;
    for (let i = 0; i < props.ferie.ansattNotat.length - len; i += len)
    {
        ansattNotat.push(<p key={i}>{props.ferie.ansattNotat.substring(i, i + len)}</p>)
    }

    console.log(ansattNotat);*/

    if (props.visible) {
        return(
            <div className={styles.DetailedView}>
                <div>Language <FontAwesomeIcon icon={faLanguage}/> {props.ferie.user.languageCode}</div>
                <div>Employee Note <FontAwesomeIcon icon={faUserAlt}/> <FontAwesomeIcon icon={faComment}/> {props.ferie.ansattNotat}</div>
                <div>Admin Note <FontAwesomeIcon icon={faUserShield}/> <FontAwesomeIcon icon={faComment}/> {props.ferie.adminNotat}</div>
                <div>date <FontAwesomeIcon icon={faCalendarDay}/> <input type="date" value={FormatDateString(props.ferie.date)} readOnly/></div>
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