import axios from 'axios';
// http:demoperxapi.perxclm.com/perx/public/api/
// const token = localStorage.getItem('grandToken');
const instance = axios.create({//http://192.168.64.2/api_call/
    // baseURL: 'http://192.168.64.2/api_call/',
    baseURL: 'http://drive.detechnovate.net/public/api/user/',
    headers:{
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
    
});



export default instance;