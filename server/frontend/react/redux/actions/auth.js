/**
 * Actions for handling account information in Redux
 */

export const login = (account) => ({
    type: 'LOGIN',
    account
});

export const logout = () => ({
    type: 'LOGOUT'
});