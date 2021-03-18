import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { page_ID__Set } from '../redux/actions/page';


// Store config
const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


/**  Wildcard page */
const Wildcard = connect(
    undefined, mapDispatchToProps
)(function(props: any) {

    useEffect(() => {
        props.page_ID__Set('Wildcard');
    }, []);


    return(
        <div id="Wildcard">

        </div>
    );
});


export = Wildcard;