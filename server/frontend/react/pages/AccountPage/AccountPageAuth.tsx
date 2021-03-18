import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {page_ID__Set} from '../../redux/actions/page';


// Store config
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account: state.auth.account
    }
}

const mapDispatchToProps = (dispatch) => ({
    page_ID__Set: (id) => {
        dispatch(page_ID__Set(id));
    }
});


/** Content of account settings dashboard for a standard user account */
const AccountPageAuth = connect(
    mapStateToProps, mapDispatchToProps
)(function AccountPageAuth(props: any) {

    useEffect(() => {
        console.log(props.account.stream_key)
    })
            

    return (
        <div className="AccountPageAuth">
            <div className="innerContent">
                <div className="AccountPageAuth__header">
                    <h1>
                        Account Dashboard
                    </h1>

                    <h3>Hi, {props.account.name}</h3>
                </div>
                <div className="AccountPageAuth__content">
                    <div className="AccountPageAuth__section">
                        <form 
                            action="/change-email" 
                            className="AccountPageAuth__form"
                            id="change_email"
                        >
                            <section>
                                <label htmlFor="name">
                                    Name:
                                </label>

                                <input 
                                    id="name" name="name" type="text"
                                    placeholder={props.account.name} disabled
                                />
                            </section>

                            <section>
                                <label htmlFor="email">
                                    Current email:
                                </label>

                                <input 
                                    id="email" name="email" type="email"
                                    placeholder={props.account.email} disabled
                                />

                                {/* <button
                                    onClick={handleEmailChange}
                                >
                                    Change email
                                </button> */}
                            </section>

                            {props.account.type === 'business' &&
                                <section>
                                    <label htmlFor="connection_id">
                                        Connection ID:
                                    </label>

                                    <input 
                                        id="connection_id" name="connection_id"
                                        type="text" placeholder={props.account.connection_id}
                                        disabled
                                    />
                                    {/* 
                                    TODO: Add button to change connection id to a new
                                    randomly generated one
                                    */}
                                </section>
                            }

                            {props.account.type === 'business' &&
                                <section className="AccountPageAuth__multiInputs">
                                    <label htmlFor="stream_key">
                                        Stream Keys:
                                    </label>

                                    {props.account.stream_key.map((key) => {
                                            console.log('Here is key', key)
                                            return (
                                                <p 
                                                    className="AccountPageAuth__streamKey"
                                                    id={key} key={key}
                                                >
                                                    {key}
                                                </p>
                                            )
                                        })

                                        }
                                </section>
                            }

                            {props.account.type === 'user' &&
                                <section>
                                    {/* TODO: Connected businesses */}
                                </section>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
});


export = AccountPageAuth;