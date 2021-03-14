export {};


/** Interface for form field validation */
export default class Validation {


    /** Validate email */
    public email(email: string): boolean {

        // Validation
        if (!email || email.length === 0) return false;
        if (!(email.split('@').length === 2)) return false;
        if (!(email.split('@')[1].split('.').length >= 2)) return false;

        return true;
    }


    /** Validate name */
    public name(name: string): boolean {

        // Validation
        if (!name || name.length === 0) return false;

        return true;
    }


    /** Validate password */
    public password(password: string): boolean {

        // Validation
        if (!password || password.length === 0) return false;
        if (password.length <= 9) return false;

        return true;
    }


    /** Validate connection password */
    public connection_password(connectionPassword: string): boolean {

        // Validation
        if (connectionPassword.length < 8) return false;
        if (connectionPassword.length > 12) return false;

        return true;
    }
}


module.exports = Validation;