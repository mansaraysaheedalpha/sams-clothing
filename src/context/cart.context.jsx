import { createContext, useState } from "react";

export const CartContext = createContext({
    cartItems: [],
    setCartItems: () => { },
    isCartOpen: false,
    setIsCartOpen: () => { },
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const value = { isCartOpen, setIsCartOpen }

    const addCartItems = (productToAdd) => {
        const existingCartItem = cartItems.find(item => item.id === productToAdd);
        if (existingCartItem) {
            setCartItems(
                cartItems.map(item =>
                    item.id === productToAdd.id ?
                        { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...productToAdd, quantity: 1 }])
        }
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};