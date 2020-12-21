/* External packages */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


/* Internal packages */
import { navMenu_Mobile__Off } from '../../../redux/actions/ui';
import AccountCardAuthMenuUser from './AccountCardAuthMenuUser';
import AccountCardAuthMenuBusiness from './AccountCardAuthMenuBusiness';


/* Component */
export class AccountCardAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }

    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        });
    }

    render() {
        return (
            <div className="AccountCardAuth">
                <button 
                    className="AccountCardAuth__profileImage"
                    onClick={this.toggleMenu}
                >
                    <img src="/dist/images/icons/account.png" alt="" />
                </button>

                <div 
                    className="AccountCardAuth__menu"
                    data-active={this.state.menu}
                >
                    {this.props.account.type === 'user' ? 
                        <AccountCardAuthMenuUser 
                            active={this.state.menu}
                        />
                        :
                        <AccountCardAuthMenuBusiness
                            active={this.state.menu}
                        />

                    }
                </div>
            </div>
        )
    }
}


/* Connect to store */
const mapStateToProps = (state) => {
    return {
        mobile_nav: state.ui.navMenu_Mobile,
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch) => ({
    navMenu_Mobile__Off: () => {
        dispatch(navMenu_Mobile__Off());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCardAuth);
