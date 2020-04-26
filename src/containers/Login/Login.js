import React, { Component } from 'react';
import CustomInput from '../../components/UI/CustomInput/CustomInput';
import Button from '../../components/UI/Button/Button';
import classes from './Login.module.css';
import { authenticateUser, setRedirectPath } from '../../store/actions';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "../../axiosInstances";
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Login extends Component {

    state = {
        loginForm: {
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
        },
        formIsValid: false,
        isSignUp: true,
    }

    checkValidity(value, rules) {
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

    inputChangedHandler = (event, inputIdentifier) => {
        const upadtedFormData = {
            ...this.state.loginForm
        };

        const updatedFormElement = { ...upadtedFormData[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.shouldValidate = true;

        upadtedFormData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let key in upadtedFormData) {
            formIsValid = upadtedFormData[key].valid && formIsValid;
        }

        this.setState({ loginForm: upadtedFormData, formIsValid: formIsValid });
    }

    loginHandler = (event) => {
        event.preventDefault();
        let email = this.state.loginForm.email.value;
        let password = this.state.loginForm.password.value;
        this.props.onLogin(email, password, this.state.isSignUp);
    }

    switchSignInHandler = () => {
        this.setState(prevState => { return { isSignUp: !prevState.isSignUp } });
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.redirectPath !== "/") {
            this.props.setRedirectPath("/");
        }
    }

    render() {
        let formElement = [];

        for (let key in this.state.loginForm) {
            formElement.push({ id: key, config: this.state.loginForm[key] });
        }

        const form = formElement.map(el => {
            return <CustomInput key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.shouldValidate}
                changed={(event) => this.inputChangedHandler(event, el.id)} />
        })

        let loginData =
            <div>
                <form onSubmit={this.loginHandler}>
                    {form}
                    <Button btnType="Success" clicked={() => { }} disabled={!this.state.formIsValid}>{this.state.isSignUp ? "SIGN UP" : "LOGIN"}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchSignInHandler} >{this.state.isSignUp ? "SWICTH TO LOGIN" : "SWICTH TO SIGN UP"}</Button>
            </div>


        if (this.props.loading) {
            loginData = <Spinner />
        }

        if (this.props.authData) {
            loginData = <Redirect to={this.props.redirectPath} />
        }

        let errorMessage = null
        if (this.props.authError) {
            errorMessage = <p>{this.props.authError.message}.</p>
        }

        return (
            <div className={classes.Login}>
                {errorMessage}
                {loginData}
            </div>
        );
    }
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