import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        }

        componentDidMount() {

            this.requestInterceptor =  axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        clearErrorHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary >
                    <Modal show={this.state.error} click={this.clearErrorHandler}>{this.state.error ? this.state.error.message : ""}</Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;

