'use client'
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu cho trạng thái giỏ hàng
export type CartItem = Food & { quantity: number }
type CartState = {
  items: CartItem[];
}

// Định nghĩa kiểu dữ liệu cho các action
type Action =
  { type: "GET_LOCALSTORE", payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | {
    type: 'CHANGE_QUANTITY_CART'; payload: {
      id: string,
      quantity: number
    }
  }
  | { type: 'REMOVE_FROM_CART'; payload: CartItem }
  | { type: 'CLEAR_CART' };

// Khởi tạo context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
}>({
  state: { items: [] },
  dispatch: () => null,
});

// Hàm reducer để quản lý trạng thái giỏ hàng
const cartReducer = (state: CartState, action: Action): CartState => {

  switch (action.type) {
    case 'GET_LOCALSTORE':
      return {
        ...state,
        items: action.payload,
      };

    case 'ADD_TO_CART':
      let findItem = state.items.find(food => food.id === action.payload.id)
      if (findItem) {
        let data = {
          ...state,
          items: [...state.items.map(food => {
            if (food.id == action.payload.id) {
              return {
                ...food,
                quantity: food.quantity + action.payload.quantity
              }
            }
            return { ...food }
          })],
        }
        localStorage.setItem("Cart", JSON.stringify(data.items))
        return data
      } else {
        let data = {
          ...state,
          items: [...state.items, { ...action.payload }],
        };
        localStorage.setItem("Cart", JSON.stringify(data.items))
        return data
      }

    case 'CHANGE_QUANTITY_CART':
      let findItm = state.items.find(food => food.id === action.payload.id)
      if (findItm) {
        let data = {
          ...state,
          items: [...state.items.map(food => {
            if (food.id == action.payload.id) {
              return {
                ...food,
                quantity: action.payload.quantity
              }
            }
            return { ...food }
          })],
        };
        localStorage.setItem("Cart", JSON.stringify(data.items))
        return data
      }
      return { ...state };

    case 'REMOVE_FROM_CART':
      let data = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
      localStorage.setItem("Cart", JSON.stringify(data.items))
      return data

    case 'CLEAR_CART':
      localStorage.setItem("Cart", JSON.stringify([]))
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    if (state.items.length) {
    } else {
      if (localStorage.getItem('Cart')) {
        let lst = JSON.parse(localStorage.getItem('Cart') as string)
        dispatch({
          type: "GET_LOCALSTORE",
          payload: lst
        })
      }
    }
  }, [])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('MyComponent must be used within a MyProvider');
  }
  return context
};
