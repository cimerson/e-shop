import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {

    if(action.type === CartActionTypes.TOGGLE_CART_HIDDEN){
        return {
            ...state,
            hidden: !state.hidden
        }
    };

    if(action.type === CartActionTypes.ADD_ITEM){
        return {
            ...state,
            cartItems: addItemToCart(state.cartItems, action.payload)
        }
    };

    return state;
};

export default cartReducer;
