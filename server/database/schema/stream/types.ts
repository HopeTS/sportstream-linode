import { Document, Model } from 'mongoose';


/** Stream document type */
export interface IStreamDocument extends Document {
    field: string;
    business: string;
    status: 'upcoming' | 'current' | 'previous';
    key: string;
}


/** Stream interface */
export interface IStream extends IStreamDocument {
    get_user_doc(cb: any): IStreamUserDocument;
    get_business_doc(cb: any): IStreamBusinessDocument;
    start_stream(cb: any): Promise<void>;
    end_stream(cb: any): Promise<void>;
}


/** Stream model interface */
export interface IStreamModel extends Model<IStream> {
    generate_key(): Promise<string>;
}


/** Stream document type (information available to connected Users) */
export interface IStreamUserDocument {
    field: string;
    key: string;
}


/** Stream document type (information available to Business owner) */
export interface IStreamBusinessDocument {
    field: string;
    key: string;
}