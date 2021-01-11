import React from 'react';
import {connect} from 'react-redux';

export function AccountPageSettings() {

    /**
     * Handles email change form submission
     */
    const handleEmailChange = (e) => {
        e.preventDefault();
        // TODO: Validate form details
        // TODO: Reset input and show error response if invalid input
        // TODO: Form axios request
        // TODO: Handle axios error
        // TODO: Handle axios response
    }

    /**
     * Handles password change form submission
     */
    const handlePasswordChange = (e) => {
        e.preventDefault();
        // TODO: Validate form details
        // TODO: Reset input and show error response if invalid input
        // TODO: Form axios request
        // TODO: Handle axios error
        // TODO: Handle axios response
    }

    /**
     * Handles stream key change form submission
     */
    const handleStreamKeyChange = (e) => {
        e.preventDefault();
        // TODO: Validate form details
        // TODO: Reset input and show error response if invalid input
        // TODO: Form axios request for adding stream key
        // TODO: Handle axios error for adding stream key
        // TODO: Handle axios response for adding stream key
        // TODO: Form axios request for deleting stream key
        // TODO: Handle axios error for deleting stream key
        // TODO: Handle axios response for deleting stream key
    }

    return (
        <div className="AccountPageSettings">
            <div className="AccountPageSettings__section">
                <form 
                    action="/change-email" 
                    className="AccountPageSettings__form"
                    id="change_email"
                >
                    <section>
                        <label htmlFor="name">
                            Name:
                        </label>

                        <input 
                            id="name" name="name" type="text"
                            placeholder={props.account.name} disabled
                        />
                    </section>

                    <section>
                        <label htmlFor="email">
                            Current email:
                        </label>

                        <input 
                            id="email" name="email" type="email"
                            placeholder={props.account.email} disabled
                        />

                        {/* <button
                            onClick={handleEmailChange}
                        >
                            Change email
                        </button> */}
                    </section>

                    {props.account.type === 'business' &&
                        <section>
                            <label htmlFor="connection_id">
                                Connection ID:
                            </label>

                            <input 
                                id="connection_id" name="connection_id"
                                type="text" placeholder={props.account.connection_id}
                                disabled
                            />
                            {/* 
                            TODO: Add button to change connection id to a new
                            randomly generated one
                            */}
                        </section>
                    }
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}

export default connect(mapStateToProps, undefined)(AccountPageSettings);