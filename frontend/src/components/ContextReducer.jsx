/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';
import { ADD_ITEM, DROP_CART, REMOVE_ITEM, UPDATE_ITEM, cartReducer } from './cartReducer'

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Define the CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, []);
    
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
