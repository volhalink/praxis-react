interface TextareaProps {
    label: string,
    text: string,
    onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Textarea(props: TextareaProps) {
    return (
        <div className="relative w-full">
            <textarea
                className="peer h-full w-full resize-y rounded-md min-h-[100%]
                border border-main-highlight-dark border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal 
                text-main-higlight-dark outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-main-highlight-dark 
                placeholder-shown:border-t-main-highlight-dark focus:border-2 focus:border-main-dark focus:border-t-transparent 
                focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" " value={props.text} onChange={props.onTextChange}
                ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 
                flex h-full w-full select-none text-[11px] font-normal leading-tight 
                text-main-highlight-dark transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 
                before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l 
                before:border-main-highlight-dark before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 
                after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r 
                after:border-main-highlight-dark after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] 
                peer-placeholder-shown:text-main-highlight-dark peer-placeholder-shown:before:border-transparent 
                peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight 
                peer-focus:text-main-dark peer-focus:before:border-t-2 peer-focus:before:border-l-2 
                peer-focus:before:border-main-dark peer-focus:after:border-t-2 peer-focus:after:border-r-2 
                peer-focus:after:border-main-dark peer-disabled:text-transparent peer-disabled:before:border-transparent 
                peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {props.label}
            </label>
        </div>
    );
}

export default Textarea;