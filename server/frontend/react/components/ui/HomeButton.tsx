import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {navMenu_Mobile__Toggle} from '../../redux/actions/ui';


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


/** Home button component (top left logo) */
const HomeButton = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {


    /** Toggle mobile nav menu */
    function toggle_nav_menu() {

        // Enable scrolling
        const html = document.getElementsByTagName('HTML')[0];
        html.setAttribute('data-Mobile_Nav', 'false');

        props.navMenu_Mobile__Toggle();
    }


    return (
        <section 
            id="HomeButton"
            onClick={props.navMenu_Mobile ? navMenu_Mobile__Toggle : undefined}
        >
            <NavLink 
                to="/"
                className="HomeButton__logo"
            >
                <img src="/dist/images/homeButton/HomeButton.png" alt="Home"/>
            </NavLink>
        </section>
    );
});


export = HomeButton;