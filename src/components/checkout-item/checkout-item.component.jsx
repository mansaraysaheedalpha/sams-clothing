import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CheckoutItemContainer, ImageContainer, QuantityContainer, RemoveButton } from './checkout-item.styles';

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

        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>

            <span className="name">{name}</span>
            <QuantityContainer>
                <div className='arrow' onClick={handleRemoveCartItems}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className='arrow' onClick={handleaddCartItems}>
                    &#10095;
                </div>

            </QuantityContainer>

            <span className='price'>${price}</span>

            <RemoveButton onClick={handleClearItemsFromCart}>&#10005;</RemoveButton>

        </CheckoutItemContainer >


    );
};

export default CheckoutItem;