export const SET_MOVIE_ID = "SET_MOVIE_ID"


export const setId = id => dispatch => {
    dispatch({
        type: SET_MOVIE_ID,
        payload: id,
    });
};

