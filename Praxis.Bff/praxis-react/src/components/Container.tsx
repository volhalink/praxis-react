import React, { Component } from 'react';

interface PropsType {
    children: JSX.Element
}

class Container extends Component<PropsType, {}> {
    render() {
        return (
            <main role="main" className="">
                {this.props.children} 
            </main>
        );
    }
}

export default Container;