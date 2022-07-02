import axios from 'axios';

const API_URL = 'http://localhost:8080';

const getAll = async () =>{
    const res = await axios.get(API_URL + '/posts');
    console.log('soy el service', res.data)
    return res.data
};

const postsService={
    getAll
};

export default postsService;