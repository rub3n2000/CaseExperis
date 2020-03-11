import React from 'react';
import styles from './Employee.module.scss';

const employee = ( props: any ) => {
return(
    <p className={styles.EmployeeP}>{props.user.fornavn} {props.user.etternavn}</p>
)
}

export default employee;