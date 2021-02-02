import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';


/** Watch page (/watch) */
export class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamActive: false;
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Watch');
        get_stream();
    };

    get_stream() {
        console.log(window.location.pathname);
    }

    render() {
        return (
            <div id="Watch">
                <section className="Watch__header">
                    <div className="Watch__headerContent">
                        Your available games
                    </div>
                </section>

                <section className="Watch__content">
                    Live Stream page
                </section>
            </div>
        );
    };
};


/* Connect to store */
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


export default connect(mapStateToProps, mapDispatchToProps)(Watch);