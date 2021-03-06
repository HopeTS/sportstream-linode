export {};
import axios from 'axios';


/** Interface for endpoints related to Streams */
export default class Stream {


    /** POST /stream/get-user-doc */
    public get_user_doc(streamKey: string): any {
        const response = axios.post(
            '/stream/get-user-doc', 
            {streamKey}, 
            {withCredentials: true}
        )
    
        .then((res: any) => {
            console.log('stramgetuserdoc endpoint res', res.data);
            return res.data;
        })
    
        .catch((error) => {
            console.error(error);
            return false;
        })
        
        return response;
    }

    /** POST /stream/get-business-doc */
    public get_business_doc(streamKey: string) {
        // TODO
        return;
    }


    /** Convert streamKey to http link to stream */
    public get_http_stream_link(streamKey: string): string {
        // TODO
        return '';
    }


    /** Convert streamKey to https link to stream */
    public get_https_stream_link(streamKey: string): string {
        // TODO
        return '';
    }
}


module.exports = Stream;