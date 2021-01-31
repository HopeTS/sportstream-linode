import axios from 'axios';

export default () => {
    axios.get('/business/get-personal-doc', {withCredentials: true})

    .then((res) => {
        console.log('get-personal-doc response', res);
        return true;
    })

    .catch((err) => {
        console.log(err);
        return false;
    })
}