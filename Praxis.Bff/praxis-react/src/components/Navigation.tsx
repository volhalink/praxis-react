import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="px-2 pt-2 pb-4 sm:flex sm:p-0 font-bold text-main-navigation-text uppercase tracking-widest">
            <NavLink to="/all" className="block px-2 py-1 hover:text-main-highlight-light/[0.9]">All</NavLink>
            <NavLink to="/current" className="mt-1 block px-2 py-1 hover:text-main-highlight-light/[0.9] sm:mt-0 sm:ml-1">Current</NavLink>
            <NavLink to="/today" className="mt-1 block px-2 py-1 hover:text-main-highlight-light/[0.9] sm:mt-0 sm:ml-1">Today</NavLink>
        </nav>
    );
}

export default Navigation;