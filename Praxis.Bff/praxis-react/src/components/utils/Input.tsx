interface InputProps {
    label: string,
    text: string,
    required?: boolean,
    onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input(props: InputProps) {
    const missingRequired = !props.text && props.required;
    return(
        <div className="relative h-10 w-full">
            <input required={props.required}
            className={`px-3 py-2.5
                    peer h-full w-full rounded-md 
                    border  border-t-transparent 
                    bg-transparent  
                    font-sans text-sm font-normal text-main-dark 
                    outline outline-0 transition-all 
                    placeholder-shown:border
                    focus:border-2 focus:border-t-transparent focus:outline-0 
                    disabled:border-0 disabled:bg-blue-gray-50 ` + (missingRequired? 
                        "border-main-error-light    focus:border-main-error-dark placeholder-shown:border-main-error-light " 
                    : "border-main-dark/[0.5] focus:border-main-dark placeholder-shown:border-main-dark/[0.5]")}
            placeholder=" " value={props.text} onChange={props.onTextChange}
            />
            <label className={`before:content[' '] after:content[' '] pointer-events-none 
                        absolute left-0 -top-1.5 
                        flex h-full w-full select-none 
                        text-[11px] font-normal leading-tight  
                        transition-all
                        before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block 
                        before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l 
                        before:transition-all 
                        after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 
                        after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r  
                        after:transition-all 
                        peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  
                        peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] 
                        peer-focus:leading-tight  peer-focus:before:border-t-2 peer-focus:before:border-l-2 
                        peer-focus:after:border-t-2 peer-focus:after:border-r-2  
                        peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent 
                        peer-disabled:peer-placeholder-shown:text-blue-gray-500 ` + (missingRequired? 
                            "text-main-error-light  before:border-main-error-light      after:border-main-error-light    peer-placeholder-shown:text-main-error-light    peer-focus:text-main-error-dark peer-focus:before:border-main-error-dark peer-focus:after:border-main-error-dark" 
                        : "text-main-dark before:border-main-dark/[0.5] after:border-main-dark/[0.5] peer-placeholder-shown:text-main-dark/[0.5] peer-focus:text-main-dark peer-focus:before:border-main-dark peer-focus:after:border-main-dark")}>
            {props.label}
            </label>
        </div>);
}

export default Input;