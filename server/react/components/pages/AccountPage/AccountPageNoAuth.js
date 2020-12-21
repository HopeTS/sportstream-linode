import React from 'react';

/**
 * Content of account settings dashboard if user is not authenticated
 */
export class AccountPageNoAuth extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {

    };

    render() {
        return (
            <div className="AccountPageNoAuth">
                <p>
                    Looks like something went wrong. Are you sure you're logged in?
                </p>
            </div>
        );
    };
};


export default AccountPageNoAuth;