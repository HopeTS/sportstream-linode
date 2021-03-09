import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';


/** Links for Desktop navgation */
function DesktopNavigationLink(props: any): JSX.Element {
    return (
        <li className="DesktopNavigationLink">
            {props.internal == true ?
                /* Internal link */
                <NavLink 
                    className="DesktopNavigationLink__link"
                    to={props.href}
                    activeClassName="current"
                    exact
                >
                    {props.text}
                </NavLink>
                :

                /* External link */
                <a 
                    className="DesktopNavigationLink__link"
                    href={props.href}
                >
                    {props.text}
                </a>
            }

            {/* Sublink menu */}
            {props.sublinks &&
                <ul className="DesktopNavigationLink__sublink_list">
                    {props.sublinks.map((sublink) => (
                        <li className="DesktopNavigationLink__sublink"
                            key={sublink.text}
                        >
                            {sublink.internal == true ?
                                /* Internal sublink */
                                <NavLink className="DesktopNavigationLink__sublink_link"
                                    to={sublink.href}
                                >
                                    {sublink.text}
                                </NavLink>
                                :

                                /* External sublink */
                                <a className="DesktopNavigationLink__sublink_link"
                                    href={sublink.href}
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
}


export = DesktopNavigationLink;