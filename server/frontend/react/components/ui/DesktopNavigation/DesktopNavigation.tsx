import React from 'react';

import DesktopNavigationLink from './DesktopNavigationLink';


/** Header Navigation component for Desktop */
function DesktopNavigation(props: any) {
    return (
        <section id="DesktopNavigation">
            <nav className="DesktopNavigation__nav">
                <ul className="DesktopNavigation__list">
                    {/* Links */}
                    {props.links &&
                        props.links.map((link) => (
                            <DesktopNavigationLink 
                                key={link.text}
                                {...link}
                            />
                        ))
                    }                 
                </ul>
            </nav>
        </section>
    );
}


export = DesktopNavigation;