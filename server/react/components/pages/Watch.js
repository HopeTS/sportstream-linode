/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import config from '../../../config/default';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            live_streams: []
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Watch');
    };

    /**
     * Gets all available RTMP streams
     */
    getLiveStreams() {
        if (this.props.account.type !== 'user') return;

        let encrypted_keys;
        axios.get(
            '/streams/user/connect-to-business',
            {withCredentials: true}
        )

        .then((res) => {
            encrypted_keys = res.data.encrypted_keys;
            console.log(encrypted_keys);

            axios.post(
                '/streams/user/get-current-streams',
                {
                    encrypted_keys: encrypted_keys
                },
            )

            .then((res) => {
                console.log('inner response', res);
            })

            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err)
        });
    }

    // http://192.168.1.244:8000/api/streams
    /**
     * Pulls the data for each RTMP stream
     */
    /* getStreamsInfo(live_streams) {
        axios({
            method: 'get',

        })
    } */

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