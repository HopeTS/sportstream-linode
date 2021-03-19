import { Document } from 'mongoose';


/** Business document type */
export interface businessType extends Document {
    name: string;
    email: string;
    password: string;
    type: string;
    streams?: {
        upcoming: string[];
        current: string[];
        previous: string[];
    };
    connectedPasswords?: string[];
    connectedUsers?: string[];
}


/** Business document type (information available to connected Users) */
export interface businessUserDocType {
    name: string;
    type: string;
    streams: string[];
}


/** Business document type (information available to owner of account) */
export interface businessPersonalDocType {
    name: string;
    email: string;
    type: string;
    streams: {
        upcoming: string[];
        current: string[];
        previous: string[];
    };
    // TODO
}