import React from 'react';

import HomeButton from '../ui/HomeButton';
import Navigation from '../ui/Navigation';
import AccountCard from './auth/AccountCard';


/** Header component */
function Header() {
    return (
        <header id="Header">
            <HomeButton />
            <Navigation />
            <AccountCard />
        </header>
    );
}


export default Header;