const axios = require('axios');


/**
 * Loads the Redux store from local_storage if it exists
 * 
 * @returns {*|undefined} The Redux store
 */
export const load_state = () => {
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


/**
 * Stores the Redux state in local_storage
 * 
 * @param {*} state The Redux store
 */
export const save_state = (state) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);

    } catch(e) {
        console.error(e);
    }
    return;
};


/**
 * Clears the Redux state from local_storage
 */
export const clear_state = () => {
    localStorage.clear();
    return;
}