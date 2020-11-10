import React from 'react';
import {connect} from 'react-redux';

import Navigation from '../ui/Navigation';
import AccountCard from './auth/AccountCard';

export class Header extends React.Component {
    render() {
        return (
            <header id="Header">
                <Navigation />
                <AccountCard />

                <img 
                    className="Header__forkMe"
                    src="/dist/images/forkmeongithub.png"
                    data-visible={this.props.page_ID == "Default"}
                />
            </header>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        page_ID: state.page.id
    };
};


export default connect(mapStateToProps, undefined)(Header);