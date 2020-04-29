import React, { useState } from 'react';
import {useEffectOnce} from 'react-use';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import Button from '../../components/UI/Button/Button';
import classes from './Login.module.css';
import { authenticateUser, setRedirectPath } from '../../store/actions';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axiosInstances";
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

const Login = props => {

    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            shouldValidate: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            shouldValidate: false,
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignUp, setSignUp] = useState(true);

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }

            if (rules.minLength) {
                isValid = value.trim().length >= rules.minLength && isValid;
            }

            if (rules.isEmail) {
                const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
                isValid = pattern.test(value) && isValid;
            }
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const upadtedFormData = {
            ...loginForm
        };

        const updatedFormElement = { ...upadtedFormData[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.shouldValidate = true;

        upadtedFormData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let key in upadtedFormData) {
            formIsValid = upadtedFormData[key].valid && formIsValid;
        }

        setLoginForm(upadtedFormData);
        setFormIsValid(formIsValid);
    }

    const loginHandler = (event) => {
        event.preventDefault();
        let email = loginForm.email.value;
        let password = loginForm.password.value;
        props.onLogin(email, password, isSignUp);
    }

    const switchSignInHandler = () => {
        setSignUp(!isSignUp);
    }

    useEffectOnce(() => {
        if (!props.buildingBurger && props.redirectPath !== "/") {
            props.setRedirectPath("/");
        }
    });

    let formElement = [];

    for (let key in loginForm) {
        formElement.push({ id: key, config: loginForm[key] });
    }

    const form = formElement.map(el => {
        return <CustomInput key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            invalid={!el.config.valid}
            shouldValidate={el.config.shouldValidate}
            changed={(event) => inputChangedHandler(event, el.id)} />
    })

    let loginData =
        <div>
            <form onSubmit={loginHandler}>
                {form}
                <Button btnType="Success" clicked={() => { }} disabled={!formIsValid}>{isSignUp ? "SIGN UP" : "LOGIN"}</Button>
            </form>
            <Button btnType="Danger" clicked={switchSignInHandler} >{isSignUp ? "SWICTH TO LOGIN" : "SWICTH TO SIGN UP"}</Button>
        </div>


    if (props.loading) {
        loginData = <Spinner />
    }

    if (props.authData) {
        loginData = <Redirect to={props.redirectPath} />
    }

    let errorMessage = null
    if (props.authError) {
        errorMessage = <p>{props.authError.message}.</p>
    }

    return (
        <div className={classes.Login}>
            {errorMessage}
            {loginData}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authData: state.auth.authData,
        loading: state.auth.loading,
        authError: state.auth.authError,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.redirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, signUp) => dispatch(authenticateUser(email, password, signUp)),
        setRedirectPath: (path) => dispatch(setRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Login, axios));