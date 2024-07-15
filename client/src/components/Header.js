import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import '../styles/Header.css';

function Header({ user, handleLogout, ThemeContext }) {
    const theme = useContext(ThemeContext);
    const classAddition = theme === 'dark' ? '-dark' : '';
  
    return (
        <header className={`header-container${classAddition}`}>
            <div className={`header-left-content${classAddition}`}>
                <h1 className={`header-title${classAddition}`}>Fitspo Pal!</h1>
            </div>
            <nav className={`header-navbar${classAddition}`}>
                <ul className={`header-link-container${classAddition}`}>
                    <li className={`header-link${classAddition}`}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={`header-link${classAddition}`}>
                        <Link to='/workouts'>Workouts</Link>
                    </li>
                    <li className={`header-link${classAddition}`}>
                        <Link to='/friends'>Friends</Link>
                    </li>
                    <li className={`header-link${classAddition}`}>
                        <Link to='/goals'>Goals</Link>
                    </li>
                    <li className={`header-link${classAddition}`}>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li className={`header-logout-button${classAddition}`}>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
                <div className={`header-profile-pic${classAddition}`}>
                    <Link to='/profile'>
                        <img className={`header-profile-img${classAddition}`} src={user.profile_pic} alt='profile-pic' />
                    </Link>
                </div>
            </nav>
            <HamburgerMenu />
        </header>
    );
}

export default Header;