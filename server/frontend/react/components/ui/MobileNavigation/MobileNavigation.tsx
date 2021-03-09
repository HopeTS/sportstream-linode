import React, {useState} from 'react';
import {connect} from 'react-redux';

import {navMenu_Mobile__Toggle} from '../../../redux/actions/ui';
import MobileNavigationLink from './MobileNavigationLink';


// Store config
const mapStateToProps = (state: any) => {
    return {
        navMenu_Mobile: state.ui.navMenu_Mobile
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    navMenu_Mobile__Toggle: () => {
        dispatch(navMenu_Mobile__Toggle());
    }
});


/** Header navigation component for mobile */
const MobileNavigation = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    const [navMenu, set_nav_menu] = useState<boolean>(false);


    /** Toggle nav menu */
    function toggle_nav_menu() {

        // Disable/enable scrolling
        const html = document.getElementsByTagName('HTML')[0];
        if (props.navMenu_Mobile) {
            html.setAttribute('data-mobile_nav', 'false');
        } else {
            html.setAttribute('data-mobile_nav', 'true');
        }

        // Set state
        props.navMenu_Mobile__Toggle();
        set_nav_menu(!navMenu);
    }


    return (
        <section id="MobileNavigation">
            <div 
                className="MobileNavigation__button"
                onClick={toggle_nav_menu}
                data-navmenu-mobile={props.navMenu_Mobile}  
            >
                {props.navMenu_Mobile ? "✕" : "☰"}
            </div>

            <nav 
                data-active={props.navMenu_Mobile}
                className="MobileNavigation__menu"
            >
                <ul 
                    className="MobileNavigation__list"
                    data-active={props.navMenu_Mobile}
                >
                    {/* Links */}
                    {props.links &&
                        props.links.map((link) => (
                            <MobileNavigationLink 
                                key={link.text}
                                {...link}
                            />
                        ))
                    }
                </ul>
            </nav>
        </section>
    );
});


export = MobileNavigation;