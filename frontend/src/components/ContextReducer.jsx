import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';


const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name,price: action.price, qty: action.qty, size: action.size }]
        case "REMOVE":
           { 
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
           }
        case "UPDATE":
            {
            let arr = [...state]
            arr.find((med,index) => {
                if(med.id === action.id){
                    arr[index] = {...med,qty: parseInt(action.qty) + med.qty, price:action.price+med.price}
                }
                return arr;
            })
            return arr
        }
        case "DROP": 
        {
             let empArray=[]
             return empArray
        }
        default:
            console.log("Error in Reducer!");
    }
}

export const CartProvider = ({ children }) => {
    const [state,dispatch]=useReducer(reducer,[]);
    return (
        <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
                {children}
        </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}


CartProvider.propTypes = {
    children: PropTypes.node
};


export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);

