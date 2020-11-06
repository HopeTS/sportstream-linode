/* Packages */
import React from 'react';
import {connect} from 'react-redux';


/* Actions */
import {page_ID__Set} from '../../redux/actions/page';


/* Component */
export class Register extends React.Component {
    constructor(props) {
        super(props);
    };


    componentWillMount() {
        this.page_ID__Set('Register');
    };


    page_ID__Set = (id) => {
        this.props.page_ID__Set(id);
    };


    render() {
        return (
            <div id="Register">
                <form className="Register__form" action="/register" method="POST">
                    <div className="Register__field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div className="Register__field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="Register__field">
                        <label>Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button className="Register__button" type="submit">submit</button>
                </form>
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


export default connect(undefined, mapDispatchToProps)(Register);