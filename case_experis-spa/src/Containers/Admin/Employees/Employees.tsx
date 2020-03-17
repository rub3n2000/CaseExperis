import React from 'react';
import styles from './Employees.module.scss';

import Employee from './Employee/Employee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const employees = ( props: any ) => {
    return(
        <div className={styles.EmployeesDiv}>
            <h4>Employees</h4>
            {props.users.map((user: any) => {
                return(<Employee userEditorOpenHandler={() => {props.userEditorOpenHandler(user)}} key={user.id} user={user}/>);
            })}
            <p className={styles.NewP} onClick={() => {props.userEditorOpenHandler(undefined)}}>
            <FontAwesomeIcon icon={faPlus}/> New User
            </p>
        </div>
    )
}

export default employees;