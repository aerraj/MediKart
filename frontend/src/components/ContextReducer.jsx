import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Define action types
const ADD_ITEM = "ADD";
const REMOVE_ITEM = "REMOVE";
const UPDATE_ITEM = "UPDATE";
const DROP_CART = "DROP";

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }];
        
        case REMOVE_ITEM:
            return state.filter((_, index) => index !== action.index);
        
        case UPDATE_ITEM:
            return state.map(item => 
                item.id === action.id 
                    ? { ...item, qty: item.qty + parseInt(action.qty, 10), price: item.price + action.price } 
                    : item
            );
        
        case DROP_CART:
            return [];
        
        default:
            console.error(`Unknown action type: ${action.type}`);
            return state;
    }
}

// Define the CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

// Define PropTypes for the CartProvider component
CartProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Custom hooks to use state and dispatch contexts
export const useCart = () => {
    const context = useContext(CartStateContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const useDispatchCart = () => {
    const context = useContext(CartDispatchContext);
    if (context === undefined) {
        throw new Error("useDispatchCart must be used within a CartProvider");
    }
    return context;
};

// Define action creators for better type safety and readability
export const addItem = (id, name, price, qty, size) => ({
    type: ADD_ITEM,
    id,
    name,
    price,
    qty,
    size,
});

export const removeItem = (index) => ({
    type: REMOVE_ITEM,
    index,
});

export const updateItem = (id, qty, price) => ({
    type: UPDATE_ITEM,
    id,
    qty,
    price,
});

export const dropCart = () => ({
    type: DROP_CART,
});
