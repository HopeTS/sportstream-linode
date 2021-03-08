import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import {login, logout} from '../../redux/actions/auth';

import Validation from '../../functions/validation/Validation';
import ClientStorage from '../../functions/clientStorage/ClientStorage';
import Endpoint from '../../functions/endpoint/Endpoint';


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
    },

    login: (account) => {
        dispatch(login(account));
    },

    logout: (account) => {
        dispatch(logout());
    } 
});


/** Login page */
const Login = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    const validation = new Validation;
    const endpoint = new Endpoint;
    const clientStorage = new ClientStorage;

    const [email, set_email] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [type, set_type] = useState<string>('starter');
    const [formError, set_form_error] = useState<string>('');


    useEffect(() => {
        props.page_ID__Set('Login');
        endpoint.clear();
    }, []);


    /** Handler for account type input field */
    function handle_set_type(type: string): void {
        set_type(type);
        clear_form_error();
        return;
    }


    /** Handler for email input field */
    function handle_set_email(email: string): void {
        set_email(email);
        clear_form_error();
        return;
    }


    /** Handler for password input field */
    function handle_set_password(password: string): void {
        set_password(password);
        clear_form_error();
        return;
    }


    /** Handle login form submission */
    function handle_login(): void {
        switch (type) {
            case 'user':
                handle_login_user();
                return;
            
            case 'business':
                handle_login_business();
                return;

            default:
                handle_set_form_error('Please select an account type.');
                return;
        }
    }


    /** Handles login for User account */
    function handle_login_user(): void {

        // Validation
        const validEmail = validation.email(email);
        const validPassword = validation.password(password);

        if (!validEmail || !validPassword) {
            handle_set_form_error('Invalid email or password.');
            return;
        }

        else {
            endpoint.user.login({email: email, password: password})
    
            .then((user) => {
    
                // If login successful
                if (typeof user !== 'string') {
                    console.log('Login successful');
                    login(user);
                    props.history.push('/dashboard');
                    return;
                }
    
                // If predictable error
                else {
                    console.log('Login unsuccessful');
                    handle_set_form_error(user);
                    return;
                }
            })
    
            // Thrown error handling
            .catch((err) => {
                console.warn(err);
                handle_set_form_error(
                    'Something went wrong on our end. Try again in a few minutes.'
                );
                return;
            });

            return;
        }
    }


    /** Handles login for Business account */
    function handle_login_business(): void {

        // Validation
        const validEmail = validation.email(email);
        const validPassword = validation.password(password);

        if (!validEmail || !validPassword) {
            handle_set_form_error('Invalid email or password');
            return;
        }

        // Validation
        else {
            endpoint.business.login({email: email, password: password})
    
            .then((business) => {
    
                // If login successul
                if (typeof business !== 'string') {
                    console.log('Login successful');
                    props.login(business);
                    props.history.push('/dashboard');
                    return;
                }
    
                // If predictable error
                else {
                    console.log('Login unsuccessful');
                    handle_set_form_error(business);
                    return;
                }
            })
    
            // Thrown error handling
            .catch((err) => {
                console.warn(err);
                handle_set_form_error(
                    'Something went wrong on our end. Try again in a few minutes.'
                );
                return;
            });

            return;
        }
    }


    /** Handles form error */
    function handle_set_form_error(errorMessage: string): void {
        console.log('Handle form error called');
        
        set_form_error(errorMessage);

        setTimeout(() => {
            clear_form_error();
        }, 2000);

        return;
    }


    /** Clears form error */
    function clear_form_error(): void {
        console.log('Clear form error called');

        if (formError) set_form_error('');
    }


    /**
     *  A User cannot access the login route unless they are not logged into
     *  the server, so the cookies and local_storage must be cleared.
     */
    function handle_logout(): void {
        props.logout();
        clientStorage.clear();
        return;
    }


    return (
        <div id="Login">
            <div 
                className="Login__form"
            >
                <div className="Login__account-type">
                    <label htmlFor="account_type">I am a...</label>

                    <select 
                        name="account_type" 
                        id="account_type"
                        onChange={(e) => handle_set_type(e.target.value)}
                    >
                        <option value="starter" defaultValue='true'>
                            Select an account type...
                        </option>
                        <option value="user">Athlete/Parent</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                <div 
                    className="Login__field"
                    data-active={type !== 'starter'}
                >
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        onChange={(e) => handle_set_email(e.target.value)}
                        required
                    />
                </div>

                <div 
                    className="Login__field"
                    data-active={type !== 'starter'}
                >
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        onChange={(e) => handle_set_password(e.target.value)}
                        required
                    />
                </div>
                
                <div 
                    className="Login__error" 
                    data-active={!!formError}
                >
                    {formError}
                </div>


                <button 
                    className="Login__button"
                    onClick={handle_login}
                    data-active={type !== 'starter'}
                >
                    submit
                </button>

                <div>
                    <p className="Login__register">
                        Don't have an account?&nbsp;
                        <NavLink to="/register">
                            Register now.
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
});


export = Login;