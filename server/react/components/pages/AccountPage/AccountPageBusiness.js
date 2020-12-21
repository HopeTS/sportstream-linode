import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

/**
 * Content of account settings dashboard for a business account
 */
export class AccountPageBusiness extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {};

    render() {
        return (
            <div className="AccountPageBusiness">
                Account page business
                {/* 
                    Content to add:

                    Name

                    Key setter/getter

                    Connected users?
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


export default connect(undefined, mapDispatchToProps)(AccountPageBusiness);