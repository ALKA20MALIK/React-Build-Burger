import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://burger-builder-9c141.firebaseio.com/'
});

export default instance;