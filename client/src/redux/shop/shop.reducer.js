// import SHOP_DATA from './shop.data';

import ShopActionTypes from './shop.types';


const INITIAL_STATE ={
    // collections: SHOP_DATA,
    collections: null,
    isFetching: false,
    errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {

    if(action.type === ShopActionTypes.FETCH_COLLECTIONS_START){
        return {
            ...state,
            isFetching: true,
        }
    };

    if(action.type === ShopActionTypes.FETCH_COLLECTIONS_SUCCESS){
        return {
            ...state,
            collections: action.payload,
            isFetching: false,
        }
    };


    if(action.type === ShopActionTypes.FETCH_COLLECTIONS_FAILURE){
        return {
            ...state,
            isFetching: false,
            errorMessage: action.payload,
        }
    };

    return state;
}

export default shopReducer;