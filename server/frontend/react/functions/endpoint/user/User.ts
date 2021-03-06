export {};
import axios from 'axios';


/** Interface for endpoints related to User accounts */
export default class User {


    /** POST /user/connect-business
     * 
     * @param key ConnectionPassword key
     */
    public connect_business(key: string):Promise<boolean> {

        // Make POST
        const response = axios.post('/user/connect-business',
            {key: key},
            {withCredentials: true}
        )

        // Handle response
        .then((res: any) => {
            console.log('user.connect_business res', res);
            return true;
        })

        .catch((err: any) => {
            return false;
        });

        return response;
    }


    /** GET /user/get-connected-businesses */
    public get_connected_businesses(): Promise<any> {

        // Make GET
        const response = axios.get(
            '/user/get-connected-businesses', {withCredentials: true}
        )

        // Clean data
        .then((res: any) => {
            return res.data;
        })

        .catch((err: any) => {
            console.log(err);
            return false;
        });

        return response;
    }


    /** GET /user/get-personal-doc */
    public get_personal_doc() {

        // Make GET
        const response = axios.get(
            '/user/get-personal-doc', {withCredentials: true}
        )
    
        // Clean data
        .then((res: any) => {
            console.log('get personal doc user data', res.data);
            return res.data;
        })
    
        .catch((err: any) => {
            console.log(err);
            return false;
        });

        return response;
    }


    /** POST /register/user */
    public register(credentials: any): Promise<any> {

        // Make POST
        const response = axios.post('/register/user', 
            {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            },
            {withCredentials: true}
        )

        .then((res: any) => {
            console.log(res);

            // If successful
            if (res.status === 201) {
                const newAccount = {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                }
                return newAccount;
            }

            // This should never happen
            return 'Something went wrong on our end. Please try again';
        })

        .catch((error: any) => {
            switch (error.response.status) {
                case 460:
                    return 'Email already registered as a User';

                case 461:
                    return 'Email already registered as a Business';

                default:
                    return 'Something went wrong on our end. Try again in a few \
                    minutes';
            }
        });

        return response;
    }


    /** POST /login/user */
    public login(credentials: any): Promise<any> {

        // Make POST
        const response = axios.post('/login/user', {
            email: credentials.email,
            password: credentials.password
        })

        .then((res: any) => {

            // If successful
            if (res.status === 202) return res.data;

            // Unhandled/ unpredictable error
            console.warn(
                'The /login/user endpoint did not throw an error \
                but did not return a proper status code...'
            );
            return 'Something went wrong on our end. Try again in a few minutes.';
        })

        .catch((error: any) => {
            if (error.response.status === 404) return 'Invalid email or password';
            if (error.response.status === 500) {
                return 'Something went wrong on our end. try again in a few minutes.';
            }

            // Unknown error
            return 'Something went wrong on our end. try again in a few minutes.';
        });

        return response;
    }


    /** GET /logout */
    public logout() {

        // Make GET
        axios.get('/logout')

        .then((res: any) => {
            return true;
        })
        
        .catch((error: any) => {
            return false;
        });
    }
}


module.exports = User;