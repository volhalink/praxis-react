import { useEffect, useState } from 'react';
import { useUser, useUserDispatch } from '../contexts/user-context';
import { getUser, loginWithGoogleUrl, logoutUrl } from '../services/user-service';

function Login() {
    const user = useUser();
    const userDispatch = useUserDispatch();

    useEffect(() => {
        getUser(user, userDispatch);
    }, [user, userDispatch]);

    const [isOpen, setIsOpen] = useState(false);
    const toggleButton = () => { setIsOpen(!isOpen); };
    const closeButtonClick = () => { setIsOpen(false); };

    return (
        <div>
        {   user?.isLoggedIn?
            <div className="ml-3 hover:text-main-highlight-dark">
                <button type="button" onClick={toggleButton} className="relative z-15 block focus:text-main-highlight-dark focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIcon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
                { isOpen && <button onClick={closeButtonClick} tabIndex={-1} className="fixed z-10 inset-0 h-full w-full bg-main-light opacity-50 cursor-default"></button> }
                { isOpen && <div onClick={closeButtonClick} className="absolute z-10 right-0 mt-2 w-40 bg-main-dark rounded-t-lg rounded-b-2xl shadow-xl">
                    <div className="block ml-4 py-1 text-main-light/[0.7] font-bold tracking-wide rounded-lg">Hello {user.name}! </div>
                    <div className="mt-1 block ml-4 py-1 text-main-light/[0.5] font-semibold rounded-lg hover:text-main-highlight-light"><a href={logoutUrl}>Log out</a></div>
                </div> }
            </div>
            : <div className="ml-3 py-2 hover:text-main-highlight-dark">
                <a href={loginWithGoogleUrl} className="font-semibold tracking-tight underline">
                Log in
                </a>
            </div>
        }
        </div>
    );
}

export default Login;