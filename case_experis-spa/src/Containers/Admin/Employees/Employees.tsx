import React from 'react';
import styles from './Employees.module.scss';

import Employee from './Employee/Employee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const employees = ( props: any ) => {

    const languageTable = {
        Norwegian: {
        NewUserLabel: "Ny Ansatt",
        EmployeesLabel: "Ansatte"
        },
        English: {
        NewUserLabel: "New Employee",
        EmployeesLabel: "Employees"
        }
};

    return(
        <div className={styles.EmployeesDiv}>
            <h4>{props.language === "Norwegian"?languageTable.Norwegian.EmployeesLabel:languageTable.English.EmployeesLabel}</h4>
            {props.users.map((user: any) => {
                if(user.email === "Admin@tidsbanken.no") {
                    return <div key={user.email}></div>;
                }
                return(<Employee userEditorOpenHandler={() => {props.userEditorOpenHandler(user)}} key={user.id} user={user}/>);
            })}
            <p className={styles.NewP} onClick={() => {props.userEditorOpenHandler(undefined)}}>
            <FontAwesomeIcon icon={faPlus}/> {props.language === "Norwegian"?languageTable.Norwegian.NewUserLabel:languageTable.English.NewUserLabel}
            </p>
        </div>
    )
}

export default employees;