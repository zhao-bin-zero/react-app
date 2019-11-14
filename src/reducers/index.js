const initialState = {
    number: 0
};

const incrementReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, {
                number: state.number + 1
            });
        default:
            return state;
    }
};
export default incrementReducer;