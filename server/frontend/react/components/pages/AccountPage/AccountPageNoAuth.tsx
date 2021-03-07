import React from 'react';


/** Content of account settings dashboard if user is not authenticated */
function AccountPageNoAuth(props: any) {

    return (
        <div className="AccountPageNoAuth">
            <p>
                Looks like something went wrong. Are you sure you're logged in?
            </p>
        </div>
    );
}


export = AccountPageNoAuth;