import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = (props) => {
    const cartItem = props.cartItem
    const { name, quantity, imageUrl, price } = cartItem;
    const { addItemToCart, removeItemFromCart, handleRemoveItem } = useContext(CartContext);

    const handleaddCartItems = () => addItemToCart(cartItem)
    const handleRemoveCartItems = () => removeItemFromCart(cartItem)

    const handleClearItemsFromCart = () => {
        handleRemoveItem(cartItem);
    };

    return (

        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <div className='name'><span>{name}</span></div>
            <div className='quantity'>
                <div className='arrow' onClick={handleRemoveCartItems}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className='arrow' onClick={handleaddCartItems}>
                    &#10095;
                </div>

            </div>

            <span className='price'>${price}</span>

            <div onClick={handleClearItemsFromCart} className='remove-button'>&#10005;</div>

        </div >


    );
};

export default CheckoutItem;