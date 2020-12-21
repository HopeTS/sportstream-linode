import React from 'react';
import {connect} from 'react-redux';

import AccountPageNoAuth from './AccountPageNoAuth';
import AccountPageUser from './AccountPageUser';
import AccountPageBusiness from './AccountPageBusiness';
import {page_ID__Set} from '../../../redux/actions/page';

/**
 * Account dashboard page
 */
export class AccountPage extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.props.page_ID__Set('AccountPage');
    };

    /**
     * Renders the content of the account page based on the state of
     * authentication
     * 
     * @returns JSX.Element
     */
    content = () => {
        if (this.props.isAuthenticated) {
            switch (this.props.account.type) {
                case 'user':
                    return <AccountPageUser />;

                case 'business':
                    return <AccountPageBusiness />;

                default:
                    return <AccountPageNoAuth />;
            }
        } else {
            return <AccountPageNoAuth />;
        }
    }

    render() {
        return (
            <div id="AccountPage">
                <section className="AccountPage__header">
                    <div className="AccountPage__headerContent">
                    </div>
                </section>

                <section className="AccountPage__content">
                    {this.content()}
                </section>
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


export default connect(undefined, mapDispatchToProps)(AccountPage);