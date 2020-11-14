/*
 *  Actions for handling account information in Redux
 */


/* Actions */
export const login = (account) => ({
    type:  'LOGIN',
    account
});

export const logout = () => ({
    type: 'LOGOUT'
});