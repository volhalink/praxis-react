import React from 'react';

interface PropsType {
    children: JSX.Element
}

function Container(props: PropsType) {
    return (
        <main role="main" className="">
            {props.children} 
        </main>
    );
}

export default Container;