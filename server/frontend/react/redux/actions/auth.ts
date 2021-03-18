/** Login Redux action */
export const login = (account: any) => ({
    type: 'LOGIN',
    account
});


/** Logout Redux action */
export const logout = () => ({
    type: 'LOGOUT'
});