
import { Link, Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { userContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(userContext);

    const handleSignOut = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (<span className="nav-link" onClick={handleSignOut}>SIGN OUT</span>)
                            : (
                                <Link className='nav-link' to='/auth'>
                                    SIGN IN
                                </Link>
                            )
                    };

                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;