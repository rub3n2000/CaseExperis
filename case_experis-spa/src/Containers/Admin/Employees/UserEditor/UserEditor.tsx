import React from 'react';
import classes from './UserEditor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus, faCalendarPlus, faSave, faComment } from '@fortawesome/free-solid-svg-icons';

const userEditor = ( props: any ) => {
    
    let theLabel = props.newMode?<>New User</>:<>Edit User</>;
    let idLabel = <label> 
    Id
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
                    Fornavn
                    <input type="text" defaultValue={props.user?props.user.fornavn:""} onChange={props.fornavnChangeHandler}/>
                </label>
                <label> 
                    Etternavn
                    <input type="text" defaultValue={props.user?props.user.etternavn:""} onChange={props.etternavnChangeHandler}/>
                </label>
                <label>
                    Passord
                    <input type="password" defaultValue={props.user?props.user.password:""} onChange={props.passwordChangeHandler}/>
                </label>
                <label> 
                    Mobilnummer
                    <input type="text" defaultValue={props.user?props.user.telefonNummer:""} onChange={props.mobilnummerChangeHandler}/>
                </label>
                <label> 
                    Email
                    <input type="email" defaultValue={props.user?props.user.email:""} onChange={props.emailChangeHandler}/>
                </label>
                <label> 
                    Feriedager Igjen
                    <input type="number" defaultValue={props.user?props.user.antallFerieIgjen:""} onChange={props.ferieDagerIgjenChangeHandler}/>
                </label>
                <label> 
                    Feriedager Tatt
                    <input type="number" defaultValue={props.user?props.user.antallFerieTatt:""} onChange={props.ferieDagerTattChangeHandler}/>
                </label>
                <label> 
                    Språk
                    <select defaultValue={props.user?props.user.languageCode: "NO"} onChange={props.languageChangeHandler}>
                        <option value="NO">NO</option>
                        <option value="EN">EN</option>
                    </select>
                </label>
                
                </div>
                <div className={classes.UserEditorButtons}>
                <div className={classes.SaveUserButton}> 
                    <button type="submit"> <FontAwesomeIcon icon={faSave}/> Save User </button>
                </div>
                <div className={classes.DeleteUserButton}> 
                <button onClick={props.deleteUser}>Delete User</button>
                </div>
                <div className={classes.MakeAdminButton}> 
                <button onClick={props.makeAdmin}>Make User Admin</button>
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