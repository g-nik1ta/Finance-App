const defaultState = {
    user: null,
}

const SET_USER = 'SET_USER';

export const ProfileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export const setUserAction = (payload) => ({ type: SET_USER, payload })