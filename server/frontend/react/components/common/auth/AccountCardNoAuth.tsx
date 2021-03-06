export {};
import React from 'react';
import {NavLink} from 'react-router-dom';


/** AccountCard content for unauthenticated users */
export class AccountCardNoAuth extends React.Component {
    
    props: any;

    
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="AccountCardNoAuth">
                <div className="AccountCardNoAuth__links">
                    <NavLink
                        className="AccountCardNoAuth__login"
                        to="/login"
                    >
                        <div>
                            Log in
                        </div>
                    </NavLink>

                    <NavLink
                        className="AccountCardNoAuth__register"
                        to="/register"
                    >
                        <div>
                            Register
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }
}


export default AccountCardNoAuth;