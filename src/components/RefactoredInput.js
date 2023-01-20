
import { useState } from "react";
import useInput from "../hooks/use-input";

const RefactoredInput = (props) => {

    const {
        value: enteredName,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        isValid: enteredNameIsValid,
        reset: resetNameInput

    } = useInput(value => value.trim() !== '');


    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        isValid: enteredEmailIsValid,
        reset: resetEmailInput

    } = useInput(value => value.trim().includes('@'));

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }


    const formSubmissionHandler = event => {
        event.preventDefault();

        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        console.log(enteredName, ' -- ', enteredEmail);

        //post to server

        //then clear textbox
        resetNameInput();
    }


    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name'
                    onChange={nameChangeHandler}
                    value={enteredName}
                    onBlur={nameBlurHandler}
                />
                {
                    nameInputHasError && <p className="error-text">Name obligatoire</p>
                }

            </div>

            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input type='text' id="email"
                   onChange={emailChangeHandler}
                   onBlur={emailBlurHandler}
                   value={enteredEmail}
                />
                {
                    emailInputHasError && <p className="error-text">Email obligatoire</p>
                }
            </div>    
            
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default RefactoredInput;
