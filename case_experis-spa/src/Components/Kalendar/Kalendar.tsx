import React from 'react';

import styles from './Kalendar.module.scss';
import KalendarKontroll from './KalendarKontroll/KalendarKontroll';
import KalendarView from './KalendarView/KalendarView';

const kalendar = ( props: any ) => {
return (
    <div className={[styles.Kalandar, styles.CenteredH].join(' ')}>
        <KalendarKontroll/>
        <KalendarView/>
    </div>
);
}

export default kalendar;