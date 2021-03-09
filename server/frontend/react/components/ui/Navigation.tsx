import React from 'react';

import HomeButton from './HomeButton';
import DesktopNavigation from './DesktopNavigation/DesktopNavigation';
import MobileNavigation from './MobileNavigation/MobileNavigation';
import links from '../../config/links';


/** Root Navigation component */
function Navigation(props: any) {
    return (
        <section id="Navigation">
            <HomeButton />

            <DesktopNavigation 
                links={links}
            />
            
            <MobileNavigation 
                links={links}                  
            />
        </section>
    );
}


export = Navigation;