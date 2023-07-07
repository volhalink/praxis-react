import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Container from './Container';
import Footer from './Footer';
import { useUser } from '../contexts/user-context';
import { HabitsProvider } from '../contexts/habbits-context';

interface PropsType {
    children: JSX.Element
}

function Layout(props: PropsType) {
    const user = useUser();
    return (
        <div className="w-full bg-violet-light text-violet-dark">
            <div className="sticky top-0 bg-violet-light">
                <div className="rounded-b-sm bg-violet-dark/[0.5]">
                    <Header />
                    {user?.isLoggedIn && <div className="hidden sm:block">
                        <Navigation />
                    </div>}
                </div>
            </div>
            <div className=" bg-endless-clouds-pattern min-h-screen">
                <HabitsProvider>
                    <Container>
                        {props.children}
                    </Container>
                </HabitsProvider>
            </div>
            <div className="sticky bottom-0 rounded-t-sm bg-violet-dark text-violet-light">
                <Footer />
            </div>
        </div>
    );
}

export default Layout;