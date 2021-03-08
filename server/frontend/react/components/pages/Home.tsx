import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import {page_ID__Set} from '../../redux/actions/page';


// Store config
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    };
};

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


/** Home component */
const Home = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    useEffect(() => {
        props.page_ID__Set('Home');
    }, [])


    return (
        <div id="Home">
            <section className="Home__header">
                <div className="Home__headerContent">
                    
                </div>
            </section>

            <section className="Home__content">
                <div className="Home__contentImage">
                    <img 
                        src="/dist/images/castamatch_2.png" 
                        alt="Castamatch"
                    />
                </div>
                <div className="Home__contentText">
                    <p>
                        Coming soon... {process.env.NAME}
                    </p>
                    <br/>
                    <small>
                        Livestream your greatest games. Save the replays.
                    </small>
                </div>
            </section>
        </div>
    );
})


export = Home;