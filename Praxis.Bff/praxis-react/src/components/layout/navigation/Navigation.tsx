import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="px-2 pt-2 pb-4 sm:flex sm:p-0 font-bold text-main-navigation-text uppercase tracking-widest">
            <NavLink to="/all" className={({ isActive, isPending }) =>  
                "block px-2 py-1 hover:text-main-highlight-light/[0.9] " + 
                (isPending ? "" 
                : isActive ? "border-b-2 border-main-navigation-text hover:text-main-navigation-text" 
                : "")}>All</NavLink>
            <NavLink to="/active" className={({ isActive, isPending }) =>
                "mt-1 block px-2 py-1 hover:text-main-highlight-light/[0.9] sm:mt-0 sm:ml-1 " +
                (isPending ? "" 
                : isActive ? "border-b-2 border-main-navigation-text  hover:text-main-navigation-text" 
                : "")}>Active</NavLink>
            <NavLink to="/today" className={({ isActive, isPending }) =>
                "mt-1 block px-2 py-1 hover:text-main-highlight-light/[0.9] sm:mt-0 sm:ml-1 " +
                (isPending ? "" 
                : isActive ? "border-b-2 border-main-navigation-text  hover:text-main-navigation-text" 
                : "")}>Today</NavLink>
        </nav>
    );
}

export default Navigation;