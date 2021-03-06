export {};
import Business from './business/Business';
import User from './user/User';
import Stream from './stream/Stream';


class Endpoint {

    // Endpoint objects
    business: any;
    user: any;
    stream: any;

    constructor() {
        this.business = new Business;
        this.user = new User;
        this.stream = new Stream;
    }
}


module.exports = Endpoint;
