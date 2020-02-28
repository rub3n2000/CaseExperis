import React from 'react';

import styles from './KalendarKontroll.module.scss';

const kalendarKontroll = ( props: any ) => {
    let userOptions = props.brukere.map((user: any) => {
        return(
            <option key={user.id} value={user.fornavn + " " + user.etternavn}>{user.fornavn} {user.etternavn}</option>
        )
    })
    return (
        <div className={styles.KalendarKontroll}>
            <select onChange={props.brukerEndretHandler}>
                <option value="All">All</option>
                {userOptions}
            </select>
            <input type="date" name="date" defaultValue={props.dag} onChange={props.dagEndretHandler}></input>
        </div>
    )
}

export default kalendarKontroll;