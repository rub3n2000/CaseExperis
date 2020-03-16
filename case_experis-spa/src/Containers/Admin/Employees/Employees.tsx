import React from 'react';
import styles from './Employees.module.scss';

import Employee from './Employee/Employee';

const employees = ( props: any ) => {
    return(
        <div className={styles.EmployeesDiv}>
            <h4>Employees</h4>
            {props.users.map((user: any) => {
                return(<Employee userEditorOpenHandler={() => {props.userEditorOpenHandler(user)}} key={user.id} user={user}/>);
            })}
        </div>
    )
}

export default employees;