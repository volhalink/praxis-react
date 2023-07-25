import { useState } from 'react';

interface SelectorOption {
    value: any,
    label: string,
    secondLabel: string | null
}

interface SelectorProps {
    initialLabel: string,
    options: SelectorOption[]
    select: (value: any) => void
}

function Select(props: SelectorProps) {
    const {initialLabel, options, select} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return(
        <div className="">
            <div className="flex items-center w-full h-8 px-2 border border-main-highlight-light">
                <div className="w-full">
                    <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex-grow flex px-2 font-semibold tracking-wide items-start">
                                <div>{initialLabel}</div>
                            </div>
                            <div className="flex-grow-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                    {isOpen? 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />}
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            {isOpen && <div className="w-full max-h-40 bg-main-light border border-main-highlight-light overflow-auto">
                {options.map(o => {
                    return <div className="w-full">
                        <button className="w-full" onClick={() => {setIsOpen(!isOpen); select(o.value);}}>
                            <div className="w-full px-2 border-b border-main-highlight-light">
                                <div className="font-semibold tracking-wide tet-sm text-main-dark/[0.7]">
                                    {o.label}
                                </div>
                                {o.secondLabel && <div className="font-normal tracking-tighter text-xs text-main-dark">
                                    {o.secondLabel}
                                </div>}
                            </div>
                        </button>
                    </div>
                })}
            </div>}                        
        </div>
    );
}

export default Select;