export {};
import axios from 'axios';

import Business from './business/Business';
import User from './user/User';
import Stream from './stream/Stream';


/** Contains all endpoint/API calls */
export default class Endpoint {

    // Endpoint objects
    business: any;
    user: any;
    stream: any;


    constructor() {
        this.business = new Business;
        this.user = new User;
        this.stream = new Stream;
    }


    /** GET /logout */
    public logout(): Promise<boolean> {

        // Make GET
        const response = axios.get('/logout')

        .then((res: any) => {
            console.log(res);
            return true;
        })

        .catch((error: any) => {
            console.error(error);
            return false;
        });

        return response;
    }
}


module.exports = Endpoint;
