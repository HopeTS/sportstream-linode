import React, {useState} from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import {connect} from 'react-redux';

import {navMenu_Mobile__Toggle} from '../../../redux/actions/ui';


// Store config
const mapDispatchToProps = (dispatch: any) => ({
    navMenu_Mobile__Toggle: () => {
        dispatch(navMenu_Mobile__Toggle());
    }
});


/** Link component for Mobile Navigation */
const MobileNavigationLink = connect(
    undefined, mapDispatchToProps
)(function(props: any) {

    const [sublinkMenu, set_sublink_menu] = useState<boolean>(false);


    /** Toggle sublink menu */
    function toggle_sublink_menu(): void {
        set_sublink_menu(!sublinkMenu);
        return;
    } 


    /** Toggle nav menu */
    function toggle_nav_menu(): void {

        // Toggle scrolling
        const html = document.getElementsByTagName('HTML')[0];
        html.setAttribute('data-Mobile_Nav', 'false');

        props.navMenu_Mobile__Toggle();
    }


    /** Handle sublink onClick */
    function sublink_click(): void {
        toggle_sublink_menu();
        toggle_nav_menu();
        return;
    }


    return (
        <li className="MobileNavigationLink">
            {props.internal == true ?
                /* Internal link */
                <NavLink 
                    className="MobileNavigationLink__link"
                    to={props.href}
                    onClick={navMenu_Mobile__Toggle}
                >
                    {props.text}
                </NavLink>
                :

                /* External link */
                <a
                    className="MobileNavigationLink__link"
                    href={props.href}
                    onClick={navMenu_Mobile__Toggle}
                    target="_blank"
                    rel="noopener"
                >
                    {props.text}
                </a>
            }

            {/* Sublink button */}
            {props.sublinks &&
                <button
                    className="MobileNavigationLink__sublink_button"
                    onClick={toggle_sublink_menu}
                    data-active={sublinkMenu}
                >
                    ▼
                </button>
            }

            {/* Sublink menu */}
            {props.sublinks &&
                <ul
                    className="MobileNavigationLink__sublink_list"
                    onClick={toggle_sublink_menu}
                    data-active={sublinkMenu}
                >
                    {props.sublinks.map((sublink) => (
                        <li
                            className="MobileNavigationLink__sublink"
                            key={sublink.text}
                        >
                            {sublink.internal == true ?
                                /* Internal sublink */
                                <NavLink
                                    className="MobileNavigationLink__sublink_link"
                                    to={sublink.href}
                                    onClick={sublink_click}
                                >
                                    {sublink.text}
                                </NavLink>
                                :

                                /* External sublink */
                                <a
                                    className="MobileNavigationLink__sublink_link"
                                    href={sublink.href}
                                    onClick={sublink_click}
                                >
                                    {sublink.text}
                                </a>
                            }
                        </li>
                    ))}
                </ul>
            }
        </li>
    );
});


export = MobileNavigationLink;