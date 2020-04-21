import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axiosInstances';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nkn',
                address: {
                    street: 'Nkn street',
                    zipCode: '696969',
                    country: 'Nkn Country',
                }
            },
            deliveryMethod: 'fastest',
        };

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.replace('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });

    }

    render() {

        let spinner =
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='text' name='email' placeholder='Your Email' />
                <input type='text' name='street' placeholder='Your Street' />
                <input type='number' name='postalCode' placeholder='Your postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>PAY RS {this.props.price.toFixed(2)}</Button>
            </form>;

        if (this.state.loading) {
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

export default ContactData;