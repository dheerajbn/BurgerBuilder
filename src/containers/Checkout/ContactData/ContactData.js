import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axiosInstances';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CustomInput from '../../../components/UI/CustomInput/CustomInput';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                shouldValidate: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                shouldValidate: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                shouldValidate: false,
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Postal Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                },
                valid: false,
                shouldValidate: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                shouldValidate: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                shouldValidate: false,
            },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        // this.setState({ loading: true });

        let formData = {};

        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userId: this.props.authData.localId,
            orderForm: formData,
            // customer: {
            //     name: this.state.orderForm[name].value,
            //     address: {
            //         street: this.state.orderForm[street].value,
            //         zipCode: this.state.orderForm[postalCode].value,
            //         country: this.state.orderForm[country].value,
            //     }
            // },
            // deliveryMethod: this.state.orderForm[deliveryMethod].value,
        };

        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({ loading: false });
        //         this.props.onClearIngredients();
        //         this.props.history.replace('/');
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false });
        //     });

        let authToken = null;

        if (this.props.authData) {
            authToken = this.props.authData.idToken;
        }

        this.props.onOrderBurger(order, authToken );

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }

            if (rules.minLength && rules.maxLength) {
                isValid = value.trim().length >= rules.minLength && value.trim().length <= rules.maxLength && isValid;
            }
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const upadtedFormData = {
            ...this.state.orderForm
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

        this.setState({ orderForm: upadtedFormData, formIsValid: formIsValid });
    }

    render() {

        let formElement = [];

        for (let key in this.state.orderForm) {
            formElement.push({ id: key, config: this.state.orderForm[key] });
        }

        let spinner =
            <form onSubmit={this.orderHandler}>
                {formElement.map(el =>
                    <CustomInput key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.shouldValidate}
                        changed={(event) => this.inputChangedHandler(event, el.id)} />
                )}
                {/* <CustomInput elementType="..." elementConfig="..." value="..." />
                <CustomInput elementType="..." elementConfig="..." value="..." />
                <CustomInput elementType="..." elementConfig="..." value="..." />
                <CustomInput elementType="..." elementConfig="..." value="..." /> */}
                {/* <CustomInput inputtype="input" label="Email" type='email' name='email' placeholder='Your Email' />
                <CustomInput inputtype="input" label="Street" type='text' name='street' placeholder='Your Street' />
                <CustomInput inputtype="input" label="Zip Code" type='number' name='postalCode' placeholder='Your postal Code' /> */}
                <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>PAY RS {this.props.price.toFixed(2)}</Button>
            </form>;

        if (this.props.loading) {
            spinner = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Contact Data</h4>
                {spinner}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        authData: state.auth.authData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order, auth) => dispatch(actionCreators.tryPuchaseBurger(order, auth)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));