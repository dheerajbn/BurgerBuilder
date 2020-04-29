import React, { useState } from 'react';
import { useUnmount } from 'react-use';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useUnmount(() => {
            // return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
            // };
        });

        const clearErrorHandler = () => {
            setError(null);
        };

        return (
            <React.Fragment >
                <Modal show={error} click={clearErrorHandler}>{error && error.message}</Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
};

export default withErrorHandler;

