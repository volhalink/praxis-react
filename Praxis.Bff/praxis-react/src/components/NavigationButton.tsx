import { useState } from 'react';
import Navigation from './Navigation';

function NavigationButton() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleButton = () => { setIsOpen(!isOpen); };
    const closeButtonClick = () => { setIsOpen(false); };
    return (
        <div className="sm:hidden">
            <div className="ml-3 hover:text-main-highlight-dark">
                <button type="button" onClick={toggleButton} className="relative z-15 block focus:text-main-highlight-dark focus:outline-none">
                    <svg className="headerIcon fill-current" viewBox="0 0 24 24">
                        { isOpen? 
                          <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                        : <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                        }
                    </svg>
                </button>
                { isOpen && <button onClick={closeButtonClick} tabIndex={-1} className="fixed z-10 inset-0 h-full w-full bg-main-light opacity-50 cursor-default"></button> }
            </div>
            { isOpen && <div onClick={closeButtonClick} className="absolute z-10 right-0 mt-2 w-32 bg-main-dark rounded-t-lg rounded-b-2xl shadow-xl">
                <Navigation />
            </div> }
        </div>
    );
}

export default NavigationButton;