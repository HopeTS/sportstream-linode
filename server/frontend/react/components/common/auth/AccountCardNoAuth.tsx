import React from 'react';
import {NavLink} from 'react-router-dom';


/** AccountCard content for unauthenticated users */
function AccountCardNoAuth(props: any) {
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


export = AccountCardNoAuth;