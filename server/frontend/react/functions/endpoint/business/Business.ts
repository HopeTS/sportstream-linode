export {};
import axios from 'axios';


/** Interface for endpoints related to Business accounts */
export default class Business {


    /** POST /business/create-stream */
    public create_stream(streamData: {field: string}): Promise<any> {

        // Make POST
        const response = axios.post('/business/create-stream', {
            stream: {
                field: streamData.field
            }
        }, {
            withCredentials: true
        })
    
        .then((res) => {
            console.log('Here is create stream response', res.data)
            return res.data;
        })
    
        .catch((err) => {
            console.log(err);
            return false;
        });

        return response;
    }


    /** POST /business/generate-connection-password */
    public generate_connection_password(
        streamData: any
    ): Promise<{password: string} | false> {

        // Make POST
        const response = axios.post('/business/generate-connection-password', {}, {
            withCredentials: true
        })
    
        .then((res) => {
            console.log('Here is generate connection password response', res.data)
            return res.data;
        })
    
        .catch((err) => {
            console.log(err);
            return false;
        });

        return response;
    } 


    /** GET /business/get-connected-users */
    public get_connected_users() {
        // TODO
        return;
    }


    /** GET /business/get-personal-doc */
    public get_personal_doc(): Promise<any> {

        // Make GET
        // Get raw data
        const response = axios.get(
            '/business/get-personal-doc', {withCredentials: true}
        )

        // Clean data
        .then((res: any) => {
            return {
                connected_users: res.data.connected_users,
                connectionPasswords: res.data.connectionPasswords,
                email: res.data.email,
                name: res.data.name,
                streams: {
                    upcoming: res.data.streams.upcoming,
                    current: res.data.streams.current,
                    previous: res.data.streams.previous
                },
                type: res.data.type
            }
        })

        .catch((err) => {
            console.log(err);
            return false;
        })

        return response;
    }


    /** GET /business/get-user-doc */
    public get_user_doc() {
        // TODO
        return;
    }


    /** POST /register/business */
    public register(credentials: any): Promise<any> {

        // Make POST
        const response = axios.post('/register/business',
            {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                business_key: credentials.business_key
            },
            {withCredentials: true}
        )

        .then((res) => {

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
            return 'Something went wrong on our end. Refresh and try again.';
        })

        // Error handling
        .catch((error) => {
            console.log(error);
            switch (error.response.status) {
                case 460:
                    return 'Email already registered as a User';

                case 461:
                    return 'Email already registered as a Business';

                case 462:
                    return 'Incorrect Business Key';

                default:
                    return 'Something went wrong on our end. Try again in a few \
                    minutes';
            }
        });

        return response;
    }


    /** POST /login/business */
    public login(credentials: any): Promise<any> {

        // Make POST
        return axios.post('/login/business', {
            email: credentials.email,
            password: credentials.password
        })

        .then((res: any) => {
            if (res.status === 202) return res.data;

            // Unhandled/ unpredictable error
            console.warn(
                'The /login/business endpoint did not throw an error \
                but did not return a proper status code...'
            );
            return 'Something went wrong on our end. Try again in a few minutes.';
        })

        // Error handling
        .catch((error: any) => {
            if (error.response.status === 404) return 'Invalid email or password';
            if (error.response.status === 500) {
                return 'Something went wrong on our end. try again in a few minutes.';
            }
            
            // Unknown error
            return 'Something went wrong on our end. try again in a few minutes.';
        });
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


module.exports = Business;