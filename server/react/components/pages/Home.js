/* Packages */
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Home extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.props.page_ID__Set('Home');
        
        let encrypted_keys;
        axios.get(
            '/streams/user/connect-to-business',
            {withCredentials: true}
        )
        .then((res) => {
            encrypted_keys = res.data.encrypted_keys;
            console.log(encrypted_keys);
        })
        .catch((err) => {
            console.log(err)
        })

        axios.get(
            '/streams/user/get-current-streams',
            {
                withCredentials: true,
                encrypted_keys: encrypted_keys
            },
        ).then((res) => {
            console.log('send get response', res);
        })
    };

    render() {
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
                            Coming soon...
                        </p>
                        <br/>
                        <small>
                            Livestream your greatest games. Save the replays.
                        </small>
                    </div>
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


export default connect(undefined, mapDispatchToProps)(Home);