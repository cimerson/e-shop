import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
}

const userReducer = (state = INITIAL_STATE, action) => {

    // if (action.type === UserActionTypes.SET_CURRENT_USER) {
    //     return {
    //         ...state,
    //         currentUser: action.payload,
    //     }
    // };

    // if (action.type === UserActionTypes.GOOGLE_SIGN_IN_SUCCESS) {
    //     return {
    //         ...state,
    //         currentUser: action.payload,
    //         error: null,
    //     }
    // };

    // if (action.type === UserActionTypes.EMAIL_SIGN_IN_SUCCESS) {
    //     return {
    //         ...state,
    //         currentUser: action.payload,
    //         error: null,
    //     }
    // };

    if (action.type === UserActionTypes.SIGN_IN_SUCCESS) {
        return {
            ...state,
            currentUser: action.payload,
            error: null,
        }
    };

    if (action.type === UserActionTypes.SIGN_OUT_SUCCESS) {
        return {
            ...state,
            currentUser: action.payload,
            error: null,
        }
    };

    // if (action.type === UserActionTypes.GOOGLE_SIGN_IN_FAILURE) {
    //     return {
    //         ...state,
    //         error: action.payload,
    //     }
    // };

    // if (action.type === UserActionTypes.GOOGLE_SIGN_IN_FAILURE) {
    //     return {
    //         ...state,
    //         error: action.payload,
    //     }
    // };

    if (action.type === UserActionTypes.SIGN_IN_FAILURE) {
        return {
            ...state,
            error: action.payload,
        }
    };

    if (action.type === UserActionTypes.SIGN_OUT_FAILURE) {
        return {
            ...state,
            error: action.payload,
        }
    };

    if (action.type === UserActionTypes.SIGN_UP_FAILURE) {
        return {
            ...state,
            error: action.payload,
        }
    };

    return state;
}

export default userReducer;
