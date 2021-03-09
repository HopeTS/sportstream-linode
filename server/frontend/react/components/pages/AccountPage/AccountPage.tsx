import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import AccountPageNoAuth from './AccountPageNoAuth';
import AccountPageAuth from './AccountPageAuth';
import {page_ID__Set} from '../../../redux/actions/page';


// Store config
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


/** Account dashboard page */
const AccountPage = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    useEffect(() => {
        props.page_ID__Set('AccountPage');
    }, []);


    return (
        <div id="AccountPage">
            <section className="AccountPage__header">
                <div className="AccountPage__headerContent">
                </div>
            </section>

            <section className="AccountPage__content">
                {props.isAuthenticated ?
                    <AccountPageAuth />
                    :
                    <AccountPageNoAuth />
                }
            </section>
        </div>
    );
});


export = AccountPage;