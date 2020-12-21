import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

/**
 * Content of account settings dashboard for a standard user account
 */
export class AccountPageUser extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {

    };

    render() {
        return (
            <div className="AccountPageUser">
                Account page user
                <div className="AccountPageUser__section">

                </div>
                {/* 
                    Content to add:

                    Name

                    Connected business(es)?
                */}
            </div>
        );
    };
};


/* Connect to store */
const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


export default connect(undefined, mapDispatchToProps)(AccountPageUser);