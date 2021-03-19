import { Document, Model } from 'mongoose';


/** Connection Password document type */
export interface IConnectionPasswordDocument extends Document {
    business: string;
    user?: string;
    password?: string;
    given?: boolean;
    used?: boolean;
}


/** Connection Password interface */
export interface IConnectionPassword extends IConnectionPasswordDocument {
    is_given(cb: any): string;
    is_used(cb: any): string;
    give(cb: any): Promise<boolean>;
    use(userID: string, cb: any): Promise<boolean>;
}


/** Connection Password model interface */
export interface IConnectionPasswordModel extends Model<IConnectionPassword> {
    generate_password(): Promise<string>;
}