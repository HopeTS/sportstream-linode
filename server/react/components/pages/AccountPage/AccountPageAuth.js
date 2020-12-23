import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

/**
 * Content of account settings dashboard for a standard user account
 */
export class AccountPageAuth extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {

    };

    /**
     * Form submission handler
     */
    submit = () => {
        // TODO
        return;
    }

    render() {
        const accountType = this.props.account.type === 'business' ? 
            'business':'Athlete';
        return (
            <div className="AccountPageAuth">
                <div className="AccountPageAuth__header">
                    <h1>
                        Account Dashboard
                    </h1>
                    <p>
                        Hi, {this.props.account.name}!
                    </p>
                </div>
                <div className="AccountPageAuth__content">
                    <div className="AccountPageAuth__section">
                        <h2>Account information:</h2>
                        <p>
                            <small>Account type:</small> {accountType}
                        </p>
                        <p>
                            <small>Name:</small> {this.props.account.name}
                        </p>
                        <p>
                            <small>Email:</small> {this.props.account.email}
                        </p>
                        {this.props.account.type === 'business' &&
                        <div className="AccountPageAuth__genKey">
                            <small>Stream key:</small> {this.props.account.genkey}
                            <button onClick={this.genKey}>
                                Generate new key
                            </button>
                        </div>                        
                        }
                    </div>
                </div>
            </div>
        );
    };
};


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountPageAuth);