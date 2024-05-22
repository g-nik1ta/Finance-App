const defaultState = {
    user: null,
}

const SET_USER = 'SET_USER';
const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';

export const ProfileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'UPDATE_CATEGORIES':
            return {
                ...state,
                user: {
                    ...state.user,
                    categories: action.payload || []
                }
            }
        default:
            return state
    }
}

export const setUserAction = (payload) => ({ type: SET_USER, payload })
export const setUserCategoriesAction = (payload) => ({ type: UPDATE_CATEGORIES, payload })