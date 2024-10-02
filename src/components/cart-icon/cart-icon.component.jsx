import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CartIconContainer, StyledShoppingIcon, ItemCount } from './cart-icon.styles.jsx';
import './cart-icon.styles.jsx';

const CartIcon = () => {
    const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext)
    const togglesCart = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer>
            <StyledShoppingIcon onClick={togglesCart} />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;