import React from 'react';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';
import { HabitsProvider } from '../contexts/habbits-context';

interface PropsType {
    children: JSX.Element
}

function Layout(props: PropsType) {
    return (
        <div className="relative w-full bg-main-light">
            <div className="sticky z-50 top-0 bg-main-light">
                <div className="rounded-b-sm bg-main-dark/[0.6]">
                    <Header />
                </div>
            </div>
            <div className="relative bg-endless-clouds-pattern min-h-screen">
                <HabitsProvider>
                    <Container>
                        {props.children}
                    </Container>
                </HabitsProvider>
            </div>
            <div className="sticky bottom-0 rounded-t-sm bg-main-light ">
                <div className="bg-main-dark/[0.9] text-main-light">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Layout;