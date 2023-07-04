import React, { Component } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Container from './Container';
import Footer from './Footer';

interface PropsType {
    children: JSX.Element
}

class Layout extends Component<PropsType, {}> {
    render() {
        return (
            <div className="w-full bg-violet-light text-violet-dark">
                <div className="rounded-b-sm bg-violet-dark/[0.5]">
                    <Header />
                    <div className="hidden sm:block">
                        <Navigation />
                    </div>
                </div>
                <div className=" bg-endless-clouds-pattern min-h-screen">
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
                <div className="rounded-t-sm bg-violet-dark text-violet-light">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Layout;