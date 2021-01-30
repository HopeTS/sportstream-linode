import Auth_Reducer from '../../../../react/redux/reducers/auth';
import userAccounts from '../../../fixtures/userAccounts';

const authDefaultState = {
    isAuthenticated: false,
    account: {
        type: '',
        name: '',
        email: ''
    }
}



test('Auth_Reducer default state', () => {
    const state = Auth_Reducer(undefined, {type: '@@init'});

    expect(state).toEqual(authDefaultState);
});


test('Log in', () => {
    const state = Auth_Reducer(
        authDefaultState,
        {
            type: "LOGIN",
            account: {
                type: userAccounts[0].type,
                name: userAccounts[0].name,
                email: userAccounts[0].email
            }
        }
    );

    expect(state).toEqual({
        isAuthenticated: true,
        account: {
            type: userAccounts[0].type,
            name: userAccounts[0].name,
            email: userAccounts[0].email
        }
    })
});


test('Log out', () => {
    const state = Auth_Reducer(
        {
            ...authDefaultState,
            isAuthenticated: true,
            account: {
                type: userAccounts[0].type,
                name: userAccounts[0].name,
                email: userAccounts[0].email    
            }
        },
        {type: "LOGOUT"}
    );

    expect(state).toEqual(authDefaultState);
});