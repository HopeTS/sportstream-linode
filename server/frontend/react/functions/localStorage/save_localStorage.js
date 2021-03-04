/**
 * Stores the Redux state in local_storage
 * 
 * @param {*} state The Redux store
 * 
 @returns {boolean} true if successful, else false
 */
export default (state) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);

    } catch(e) {
        console.error(e);
        return false;
    }
    return true;
};
