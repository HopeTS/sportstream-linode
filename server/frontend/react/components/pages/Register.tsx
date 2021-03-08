import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {page_ID__Set} from '../../redux/actions/page';
import {login} from '../../redux/actions/auth';

import Validation from '../../functions/validation/Validation';
import Endpoint from '../../functions/endpoint/Endpoint';
import ClientStorage from '../../functions/clientStorage/ClientStorage';


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
    }
});


const Register = connect(
    mapStateToProps, mapDispatchToProps
)(function(props: any) {

    const validation = new Validation;
    const endpoint = new Endpoint;
    const clientStorage = new ClientStorage;

    const [name, set_name] = useState<string>('');
    const [email, set_email] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [passwordCheck, set_password_check] = useState<string>('');
    const [businessKey, set_business_key] = useState<string>('');
    const [type, set_type] = useState<string>('starter');
    const [formError, set_form_error] = useState<string>('');


    useEffect(() => {
        props.page_ID__Set('Register');
        clientStorage.clear();
    }, []);


    /** Handler for business key input field */
    function handle_set_business_key(business_key: string): void {
        set_business_key(business_key);
        clear_form_error();
        return;
    }


    /** Handler for name input field */
    function handle_set_name(name: string): void {
        set_name(name);
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


    /** Handler for password check input field */
    function handle_set_password_check(password: string): void {
        set_password_check(password);
        clear_form_error();
        return;
    }


    /** Handler for type input field */
    function handle_set_type(type: string): void {
        set_type(type);
        clear_form_error();
        return;
    }


    /** Handle registration form submission */
    function handle_register() {
        switch(type) {
            case 'business':
                handle_register_business();
                return;

            case 'user':
                handle_register_user();
                return;

            default:
                handle_set_form_error('Please select an account type.');
                return;
        }
    }


    /** Handle registration for business account */
    function handle_register_business(): void {

        // Validation
        if (password  !== passwordCheck) {
            handle_set_form_error("Passwords don't match");
            return;
        }

        const validName = validation.name(name);
        const validEmail = validation.email(email);
        const validPassword = validation.password(password);
        if (!validName || !validEmail || !validPassword) {
            handle_set_form_error('Invalid name, email or password');
            return;
        }

        // Register
        endpoint.business.register({
            name: name,
            email: email,
            password: password,
            business_key: businessKey
        })

        .then((business) => {

            // If registration successful
            if (typeof business !== 'string') {
                console.log('Registration successful');
                handle_login_business();
                return;
            }

            else {
                console.log('Registration unsuccessful');
                handle_set_form_error(business);
                return;
            }
        })

        .catch((error) => {
            handle_set_form_error(
                'Something went wrong on our end. Please try again \
                in a few minutes.'
            );
            return;
        });
    }


    /** Handle registration for user account */
    function handle_register_user(): void {

        // Validation
        if (password  !== passwordCheck) {
            handle_set_form_error("Passwords don't match");
            return;
        }

        const validName = validation.name(name);
        const validEmail = validation.email(email);
        const validPassword = validation.password(password);
        if (!validName || !validEmail || !validPassword) {
            handle_set_form_error('Invalid name, email or password');
            return;
        }

        // Register
        endpoint.user.register({
            email: email,
            password: password,
            name: name
        })
        
        .then((user) => {

            // If registration successful
            if (typeof user !== 'string') {
                console.log('Registration successful');
                handle_login_user();
                return;
            }

            else {
                console.log('Registration unsuccessful');
                handle_set_form_error(user);
                return;
            }
        })

        .catch((error) => {
            handle_set_form_error(
                'Something went wrong on our end. Try again \
                in a few minutes.'
            );
            return;
        });
    }


    /** Handler login for business account */
    function handle_login_business(): void {

        // Login
        endpoint.business.login({email: email, password: password})

        .then((business) => {

            // If login successful
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

        .catch((err) => {
            console.warn(err);
            handle_set_form_error(
                'Something went wrong on our end. Try again in a few minutes.'
            );
            return;
        });
    }


    /** Handle login for user account */
    function handle_login_user(): void {

        // Login
        endpoint.user.login({email: email, password: password})

        .then((user) => {

            // If login successful
            if (typeof user !== 'string') {
                console.log('Login successful');
                props.login(user);
                props.history.push('/dashboard');
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
        })
    }


    /** Handles form error */
    function handle_set_form_error(errorMessage: string): void {
        set_form_error(errorMessage);

        setTimeout(() => {
            clear_form_error();
        }, 2000);
        return;
    }


    /** Clears form error */
    function clear_form_error(): void {
        if (formError) {
            set_form_error('');
        }
        return;
    }


    return (
        <div id="Register">
            <div className="Register__form">
                <div className="Register__account-type">
                    <label htmlFor="account_type">I am a...</label>
                    
                    <select 
                        name="account_type" 
                        id="account_type"
                        onChange={(e) => handle_set_type(e.target.value)}
                    >
                        <option value="starter" defaultValue='true'>
                            Select an account type...
                        </option>
                        <option value="business">Business</option>
                        <option value="user">Athlete/Parent</option>
                    </select>
                </div>

                <div 
                    className="Register__field"
                    data-active={type !== 'starter'}
                >
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        onChange={(e) => handle_set_name(e.target.value)}
                        required
                    />
                </div>

                <div 
                    className="Register__field"
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
                    className="Register__field"
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
                    className="Register__field"
                    data-active={type !== 'starter'}
                >
                    <label htmlFor="passwordCheck">Re-enter Password</label>
                    <input 
                        type="password"
                        id="passwordCheck"
                        name="passwordCheck"
                        onChange={
                            (e) => handle_set_password_check(e.target.value)
                        }
                        required
                    />
                </div>

                <div 
                    className="Register__field"
                    data-type="business"
                    data-active={type === 'business'}
                >
                    <label htmlFor="businessKey">Business Key</label>
                    <input 
                        type="text"
                        name="business_key"
                        id="business_key"
                        onChange={
                            (e) => handle_set_business_key(e.target.value)
                        }
                    />
                </div>

                <div 
                    className="Register__field"
                    data-active={type !== 'starter'}
                >
                    <p className="Register__disclaimer">
                        By clicking Sign Up, you acknowledge that you have  
                        read and agree to the&nbsp;
                        <a 
                            target="_blank" 
                            rel="noopener" 
                            href="/legal/terms-of-use"
                        >
                            Terms of Use
                        </a>
                        &nbsp;and&nbsp;
                        <a 
                            target="_blank"
                            rel="noopener"
                            href="/legal/privacy-policy"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>

                <button 
                    className="Register__button"
                    onClick={() => handle_register()}
                    data-active={type !== 'starter'}
                >
                    Sign Up
                </button>

                <div 
                    className="Register__error"
                    data-active={!!formError}
                >
                    <p>{formError}</p>
                </div>

                <div>
                    <p className="Register__login">
                        Already have an account? <NavLink to="/login">Sign in.</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
});


export = Register;