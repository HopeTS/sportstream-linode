import React from 'react';
import {connect} from 'react-redux';


/** Settings section for Business account */
export function BusinessSettings(props: any) {

    /** Handles email change form submission */
    //const handleEmailChange = (e) => {
        //e.preventDefault();
        // TODO: Validate form details
        // TODO: Reset input and show error response if invalid input
        // TODO: Form axios request
        // TODO: Handle axios error
        // TODO: Handle axios response
    //}

    /** Handles password change form submission */
    //const handlePasswordChange = (e) => {
        //e.preventDefault();
        // TODO: Validate form details
        // TODO: Reset input and show error response if invalid input
        // TODO: Form axios request
        // TODO: Handle axios error
        // TODO: Handle axios response
    //}

    /** Handles stream key change form submission */
    //const handleStreamKeyChange = (e) => {
        //e.preventDefault();
        // TODO: Validate form details
        // TODO: Reset input and show error response if invalid input
        // TODO: Form axios request for adding stream key
        // TODO: Handle axios error for adding stream key
        // TODO: Handle axios response for adding stream key
        // TODO: Form axios request for deleting stream key
        // TODO: Handle axios error for deleting stream key
        // TODO: Handle axios response for deleting stream key
    //}

    return (
        <div className="AccountPageSettings">
            <div className="AccountPageSettings__section">
                <form 
                    action="/change-email" 
                    className="AccountPageSettings__form"
                    id="change_email"
                >
                    <section>
                        <label htmlFor="email">
                            Current email:
                        </label>

                        <input 
                            id="email"
                            name="email"
                            type="text"
                            placeholder={props.account.email}
                            disabled
                        />

                        {/* <button
                            onClick={handleEmailChange}
                        >
                            Change email
                        </button> */}
                    </section>
                    {/* 
                        TODO: Email section 
                        Contains current email
                        Form to change email
                        Submit button
                    */}
                </form>
            </div>

            <div className="AccountPageSettings__section">
                <form 
                    action="/change-password"
                    id="change_password"
                    className="AccountPageSettings__form"
                >
                    {/* 
                        TODO: Password section  
                        Contains option to change password
                        Submit button
                    */}
                </form>
            </div>

            <div className="AccountPageSettings__section">
                <form 
                    action="handle-keys" 
                    className="AccountPageSettings__form"
                >
                    {/* 
                        TODO: Stream key section 
                        Contains current stream keys
                        Option to delete keys
                        Option to add keys
                        (MVP VITAL)
                    */}
                </form>
            </div>

            <div className="AccountPageSettings__section">
                <form 
                    action="" 
                    className="AccountPageSettings__form"
                >
                    {/*
                        TODO: Connected users section
                        (Show ten, then a 'show more' option)
                    */}
                </form>
            </div>
        </div>
    );
}


// Connect to store
const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}


export default connect(mapStateToProps, undefined)(BusinessSettings);