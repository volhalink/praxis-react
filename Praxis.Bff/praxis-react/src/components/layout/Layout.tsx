import React from 'react';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';


interface PropsType {
    children: JSX.Element
}

function Layout(props: PropsType) {
    return (
        <div className="relative w-full bg-main-light text-main-darker">
            <div className="sticky z-50 top-0 bg-main-light">
                <div className="rounded-b-sm bg-main-dark/[0.6] shadow-lg shadow-main-shadow">
                    <Header />
                </div>
            </div>
            <div className="relative bg-endless-clouds-pattern min-h-screen">
                <Container>
                    {props.children}
                </Container>
            </div>
            <div className="sticky bottom-0 rounded-t-sm bg-main-light ">
                <div className="bg-main-darker text-main-light">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Layout;