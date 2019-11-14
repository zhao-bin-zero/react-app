export const increment = (dispatch) => {
    setTimeout(() => {
        dispatch(
            {
                type: 'INCREMENT',
            }
        )
    }, 2000)
};