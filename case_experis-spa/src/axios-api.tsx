import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://case-experis-api.herokuapp.com/api'
});

export default instance;