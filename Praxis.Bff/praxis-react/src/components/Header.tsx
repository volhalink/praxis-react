import React from 'react';
import Logo from './Logo';
import Login from './Login';
import CalendarMenu from './CalendarMenu';
import Langage from './Language';
import NavigationButton from './NavigationButton';

function Header() {
    return (
        <header className="p-3" >
            <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center justify-between">
                <Langage/>
                <CalendarMenu />
                <Login />
                <NavigationButton/>
            </div>
            </div>
        </header>
    );
}

export default Header;