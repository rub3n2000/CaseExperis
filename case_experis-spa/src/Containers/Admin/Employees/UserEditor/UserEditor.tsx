import React from 'react';
import classes from './UserEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus, faCalendarPlus, faSave, faComment } from '@fortawesome/free-solid-svg-icons';

const userEditor = ( props: any ) => {

    const languageTable = {
        Norwegian: {
        EditorLabel: "Rediger Ansatt",
        NewLabel: "Ny ansatt",
        IdLabel: "Id",
        NameLabel: "Fornavn",
        SurnameLabel: "Last Name",
        PasswordLabel: "Passord",
        PhoneNumberLabel: "Telefonnummer",
        EmailLabel: "Epost",
        RemainingVacationDaysLabel: "Gjenværende Feriedager",
        TakenVacationDaysLabel: "Brukte Feriedager",
        LanguageLabel: "Språk",
        SaveUserLabel: "Lagre Ansatt",
        DeleteUserLabel: "Slett Ansatt",
        MakeEmployeeAdminLabel: "Gjør Ansatt Admin"
        },
        English: {
        EditorLabel: "Edit Employee",
        NewLabel: "Ny Ansatt",
        IdLabel: "Id",
        NameLabel: "First Name",
        SurnameLabel: "Last Name",
        PasswordLabel: "Password",
        PhoneNumberLabel: "Phonenumber",
        EmailLabel: "Email",
        RemainingVacationDaysLabel: "Remaining Vacationdays",
        TakenVacationDaysLabel: "Spent Vacationdays",
        LanguageLabel: "Language",
        SaveUserLabel: "Save Employee",
        DeleteUserLabel: "Delete Employee",
        MakeEmployeeAdminLabel: "Make Employee Admin"
        }
    };
    
    let theLabel = props.newMode?<>{props.language === "Norwegian"?languageTable.Norwegian.NewLabel:languageTable.English.NewLabel}
    </>:<>{props.language === "Norwegian"?languageTable.Norwegian.EditorLabel:languageTable.English.EditorLabel}</>;
    let idLabel = <label> 
    {props.language === "Norwegian"?languageTable.Norwegian.IdLabel:languageTable.English.IdLabel}
    <input type="number" defaultValue={props.user?props.user.id:""} readOnly/>
    </label>;

    if(!props.user) {
        idLabel = <></>;
    }
    if(props.visible)
    {
        return(
            <div className={classes.UserEditorComponent}>
            <div className={classes.UserEditorForm}>
                {theLabel}
                <form onSubmit={props.NewUser}>
                <div className={classes.UserEditorInfo}>
                {idLabel}
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.NameLabel:languageTable.English.NameLabel}
                    <input type="text" defaultValue={props.user?props.user.fornavn:""} onChange={props.fornavnChangeHandler}/>
                </label>
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.SurnameLabel:languageTable.English.SurnameLabel}
                    <input type="text" defaultValue={props.user?props.user.etternavn:""} onChange={props.etternavnChangeHandler}/>
                </label>
                <label>
                {props.language === "Norwegian"?languageTable.Norwegian.PasswordLabel:languageTable.English.PasswordLabel}
                    <input type="password" defaultValue={props.user?props.user.password:""} onChange={props.passwordChangeHandler}/>
                </label>
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.PhoneNumberLabel:languageTable.English.PhoneNumberLabel}
                    <input type="text" defaultValue={props.user?props.user.telefonNummer:""} onChange={props.mobilnummerChangeHandler}/>
                </label>
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.EmailLabel:languageTable.English.EmailLabel}
                    <input type="email" defaultValue={props.user?props.user.email:""} onChange={props.emailChangeHandler}/>
                </label>
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.RemainingVacationDaysLabel:languageTable.English.RemainingVacationDaysLabel}
                    <input type="number" defaultValue={props.user?props.user.antallFerieIgjen:""} onChange={props.ferieDagerIgjenChangeHandler}/>
                </label>
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.TakenVacationDaysLabel:languageTable.English.TakenVacationDaysLabel}
                    <input type="number" defaultValue={props.user?props.user.antallFerieTatt:""} onChange={props.ferieDagerTattChangeHandler}/>
                </label>
                <label> 
                {props.language === "Norwegian"?languageTable.Norwegian.LanguageLabel:languageTable.English.LanguageLabel}
                    <select defaultValue={props.user?props.user.languageCode: "NO"} onChange={props.languageChangeHandler}>
                        <option value="NO">NO</option>
                        <option value="EN">EN</option>
                    </select>
                </label>
                
                </div>
                <div className={classes.UserEditorButtons}>
                <div className={classes.SaveUserButton}> 
                    <button type="submit"> <FontAwesomeIcon icon={faSave}/> {props.language === "Norwegian"?languageTable.Norwegian.SaveUserLabel:languageTable.English.SaveUserLabel} </button>
                </div>
                <div className={classes.DeleteUserButton}> 
                <button onClick={props.deleteUser}>{props.language === "Norwegian"?languageTable.Norwegian.DeleteUserLabel:languageTable.English.DeleteUserLabel}</button>
                </div>
                <div className={classes.MakeAdminButton}> 
                <button onClick={props.makeAdmin}>{props.language === "Norwegian"?languageTable.Norwegian.MakeEmployeeAdminLabel:languageTable.English.MakeEmployeeAdminLabel}</button>
                </div>
                </div>
                </form>
            </div>
        </div>
        );
    }
    else {
        return(<></>)
    }
}

export default userEditor;