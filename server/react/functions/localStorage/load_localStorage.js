import axios from 'axios';

/**
 * Loads the Redux store from localStorage if it exists
 * 
 * @returns {*|undefined} The Redux store
 */
export default () => {
    try {
        // Pull state from local_storage
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
       
        // Check if user is logged in on the server side
        axios.get('/ensure-login')
        .then((res) => {
            console.log('axios response')
            console.log(res)
        })

        return JSON.parse(serializedState);

    } catch(e) {
        console.error(e);
        return undefined;
    }
}; 