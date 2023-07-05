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
            <div className="ml-3 hower:text-violet-800">
                <button type="button" onClick={toggleButton} className="relative z-15 block focus:text-violet-800 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIcon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
                { isOpen && <button onClick={closeButtonClick} tabIndex={-1} className="fixed z-10 inset-0 h-full w-full bg-violet-light opacity-50 cursor-default"></button> }
                { isOpen && <div onClick={closeButtonClick} className="absolute z-10 right-0 mt-2 w-40 bg-violet-dark rounded-t-lg rounded-b-2xl shadow-xl">
                    <div className="block ml-4 py-1 text-violet-light font-bold tracking-wide rounded-lg">Hello {user.name}! </div>
                    <div className="mt-1 block ml-4 py-1 text-violet-light font-semibold rounded-lg hover:text-violet-600"><a href={logoutUrl}>Log out</a></div>
                </div> }
            </div>
            : <div className="ml-3 hover:text-violet-800">
                <a href={loginWithGoogleUrl}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIcon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </a>
            </div>
        }
        </div>
    );
}

export default Login;