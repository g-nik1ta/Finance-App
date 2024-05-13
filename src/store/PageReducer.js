const defaultState = {
    breadcrumb: [],
}

const SET_BREADCRUMB = 'SET_BREADCRUMB'

export const PageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_BREADCRUMB:
            return { ...state, breadcrumb: action.payload }
        default:
            return state
    }
}

export const setBreadcrumbAction = (payload) => ({ type: SET_BREADCRUMB, payload })