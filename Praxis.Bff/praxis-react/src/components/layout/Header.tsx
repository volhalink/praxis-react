import React from 'react';
import Logo from './Logo';
import Login from '../profile/Login';
import CalendarMenu from '../progress/CalendarMenu';
import Language from '../profile/Language';
import NavigationButton from './navigation/NavigationButton';
import Navigation from './navigation/Navigation';
import { useUserState } from '../../contexts/user-context';

function Header() {
    const {user} = useUserState();
    return (
        <header className="p-3 text-main-navigation-text" >
            <div className="flex items-center justify-between">
            <Logo />
            {user?.isLoggedIn && <div className="hidden sm:block">
                <Navigation />
            </div>}
            <div className="flex items-center justify-between">
                <Language/>
                { user?.isLoggedIn && <CalendarMenu /> }
                <Login />
                { user?.isLoggedIn && <NavigationButton/> }
            </div>
            </div>
        </header>
    );
}

export default Header;