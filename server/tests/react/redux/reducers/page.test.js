import Page_Reducer from '../../../../react/redux/reducers/page';

const pageDefaultState = {
    id: null
}

test('Page_Reducer default state', () => {
    const state = Page_Reducer(undefined, {type: '@@init'});

    expect(state).toEqual(pageDefaultState);
})
