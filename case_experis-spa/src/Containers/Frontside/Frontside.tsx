import React, { useState, useEffect } from 'react';

import styles from './Frontside.module.scss';

import Nav from '../Nav/Nav';
import Kalendar from '../Kalendar/Kalendar';

const Frontside = ( props : any ) => {

    return (
        <div className={[styles.LayoutDiv, styles.CenteredH].join(' ')}>
            <Nav setNorwegian={props.setNorwegian} setEnglish={props.setEnglish} language={props.language} updateLanguageToUsers={props.updateLanguageToUsers}
            errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>
            <Kalendar language={props.language} godkjentOnly setErrorMessage={props.setErrorMessage} clearErrorMessage={props.clearErrorMessage}/>
        </div>
    );
}

export default Frontside;