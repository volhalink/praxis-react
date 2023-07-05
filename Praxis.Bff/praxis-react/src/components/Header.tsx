import React from 'react';
import Logo from './Logo';
import Login from './Login';
import CalendarMenu from './CalendarMenu';
import Langage from './Language';
import NavigationButton from './NavigationButton';
import { useUser } from '../contexts/user-context';

function Header() {
    const user = useUser();
    return (
        <header className="p-3" >
            <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center justify-between">
                <Langage/>
                { user?.isLoggedIn && <CalendarMenu /> }
                <Login />
                { user?.isLoggedIn && <NavigationButton/> }
            </div>
            </div>
        </header>
    );
}

export default Header;