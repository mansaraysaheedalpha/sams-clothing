import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('checkout');
    };


    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems && cartItems.length > 0 ? (
                        cartItems.map((cartItem) => (
                            <CartItem key={cartItem.id} cartItem={cartItem} />
                        ))
                    ) : (
                        <span className='empty-message'>Your cart is empty</span>
                    )
                }
            </div>
            <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>

        </div>
    );
};

export default CartDropdown;
