import React from 'react';

import styles from './KalendarView.module.scss';

const kalendarView = ( props: any ) => {

    return (
        <div className={styles.KalendarView}>
            <div className={styles.Days}>
                <div>
                    Mandag
                </div>
                <div>
                    Tirsdag
                </div>
                <div>
                    Onsdag
                </div>
                <div>
                    Torsdag
                </div>
                <div>
                    Fredag
                </div>
                <div>
                    Lørdag
                </div>
                <div>
                    Søndag
                </div>
            </div>
            <div className={styles.Vacations}>
               
            </div>
        </div>
    )
}

export default kalendarView;