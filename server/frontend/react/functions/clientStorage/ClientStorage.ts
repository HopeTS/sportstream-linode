export {};
import axios from 'axios';


/** interface for localStorage and cookies */
class ClientStorage {


    /** Clear localStorage */
    public clear() {

        // Clear localStorage
        localStorage.clear();

        // Clear cookies
        document.cookie = 'user' + '=;'
        return;
    }
 

    /** Saves the Redux state in local storage */
    public save(state: any): boolean {
        try {
            localStorage.setItem('state', JSON.stringify(state));
            return true;
        }

        catch(e) {
            console.error(e);
            return false;
        }
    }


    /** Loads the Redux state from local storage (asynchronous) */
    public load(): object | undefined {
        try {

            // Pull state from localStorage
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) return undefined;

            // Validate data with server
            axios.get('/ensure-login')
            .then((res) => {
                console.log('LocalStorage load response:');
                console.log(res);
            });

            return JSON.parse(serializedState);
        }

        catch(e) {
            console.error(e);
            return undefined;
        }
    }
}


module.exports = ClientStorage;