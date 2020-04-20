import axios from 'axios';

const defaultInstance = axios.create({
    baseURL: 'YOUR BASE URL',
});

export default defaultInstance;