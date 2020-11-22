/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import config from '../../../config/default';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Streams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            live_streams: []
        };
    };

    componentWillMount() {
        this.props.page_ID__Set('Streams');
        this.getLiveStreams();
    };

    getLiveStreams() {
        /**
         * Pulls all RTMP streams from the server
         */
        axios({
            method: "get",
            withCredentials: true,
            url: `${window.location.origin}/${config.rtmp.port}/api/streams`
        }).then((res) => {
            const streams = res.data;
            if (typeof (streams['live'] !== 'undefined')) {
                this.getStreamsInfo(streams['live']);
            }
        });
    }

    getStreamsInfo(live_streams) {
        /**
         * Pulls the data for each RTMP stream
         */
        axios({
            method: 'get',

        })
    }

    render() {
        return (
            <div id="Streams">
                <section className="Streams__header">
                    <div className="Streams__headerContent">
                        Your available games
                    </div>
                </section>

                <section className="Streams__content">
                    Live Stream page
                </section>
            </div>
        );
    };
};


/* Connect to store */
const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


export default connect(undefined, mapDispatchToProps)(Streams);