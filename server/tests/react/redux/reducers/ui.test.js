import UI_Reducer from '../../../../react/redux/reducers/ui';

const uiDefaultState = {
    navMenu_Mobile: false,
    accountMenu: false
}


test('UI_Reducer default state', () => {
    const state = UI_Reducer(undefined, {type: '@@init'});

    expect(state).toEqual(uiDefaultState);
});


test('Toggle mobile nav', () => {
    const state = UI_Reducer(undefined, {type: "MOBILE_NAV__TOGGLE"});

    expect(state.navMenu_Mobile).toBe(true);
});


test('Toggle mobile nav on', () => {
    const state = UI_Reducer(
        {...uiDefaultState, navMenu_Mobile: false}, 
        {type: "MOBILE_NAV__ON"}
    );

    expect(state.navMenu_Mobile).toBe(true);
});


test('Toggle mobile nav off', () => {
    const state = UI_Reducer(
        {...uiDefaultState, navMenu_Mobile: true},
        {type: "MOBILE_NAV__OFF"});

    expect(state.navMenu_Mobile).toBe(false);
});


test('Toggle account menu', () => {
    const state = UI_Reducer(undefined, {type: "ACCOUNT_MENU__TOGGLE"});

    expect(state.accountMenu).toBe(true);
})


test('Toggle account menu on', () => {
    const state = UI_Reducer(
        {...uiDefaultState, accountMenu: false},
        {type: "ACCOUNT_MENU__ON"}
    );

    expect(state.accountMenu).toBe(true);
});


test('Toggle account menu off', () => {
    const state = UI_Reducer(
        {...uiDefaultState, accountMenu: true},
        {type: 'ACCOUNT_MENU__OFF'}
    );

    expect(state.accountMenu).toBe(false);
});