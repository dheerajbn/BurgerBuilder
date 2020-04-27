import axios from 'axios';

const defaultInstance = axios.create({
    baseURL: 'YOUR API ENDPOINT',
});

export default defaultInstance;