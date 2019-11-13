// import SHOP_DATA from './shop.data';

import ShopActionTypes from './shop.types';

const INITIAL_STATE ={
    // collections: SHOP_DATA,
    collections: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {

    if(action.type === ShopActionTypes.UPDATE_COLLECTIONS){
        return {
            ...state,
            collections: action.payload
        }
    };

    return state;
}

export default shopReducer;