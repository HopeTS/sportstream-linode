/**
 * Handler functions for localStorage
 */

 /* External packages */
const axios = require('axios');


/**
 * Loads the Redux store from localStorage if it exists
 * 
 * @returns {*|undefined} The Redux store
 */
export const loadState = () => {
    try {
        // Pull state from localStorage
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
 * Stores the Redux state in localStorage
 * 
 * @param {*} state The Redux store
 */
export const saveState = (state) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);

    } catch(e) {
        console.error(e);
    }
};

/**
 * Clears the Redux state from localStorage
 */
export const clearState = () => {
    // TODO
}