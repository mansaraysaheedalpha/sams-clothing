import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { userContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(userContext);
    const { isCartOpen } = useContext(CartContext);

    const handleSignOut = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                < NavLinks>
                    < NavLink to='/shop'>
                        SHOP
                    </ NavLink>
                    {
                        currentUser ? (< NavLink as="span" onClick={handleSignOut}>SIGN OUT</ NavLink>)
                            : (
                                < NavLink to='/auth'>
                                    SIGN IN
                                </ NavLink>
                            )
                    }

                    <CartIcon />
                    < NavLink to='/purchases'>
                    </ NavLink>
                </ NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;