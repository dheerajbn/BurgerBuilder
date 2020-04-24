import axios from 'axios';

const defaultInstance = axios.create({
    baseURL: 'https://my-react-burger-42574.firebaseio.com/',
});

export default defaultInstance;