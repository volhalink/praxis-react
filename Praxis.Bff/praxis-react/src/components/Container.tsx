import { useEffect } from 'react';
import { getAllHabitsAsync } from '../services/habbits-service';
import { useHabitsDispatch } from '../contexts/habbits-context';

interface PropsType {
    children: JSX.Element
}

function Container(props: PropsType) {
    const habitsDispatch = useHabitsDispatch();

    useEffect(() => {
        getAllHabitsAsync(habitsDispatch);
    }, [habitsDispatch]);

    return (
        <main role="main" className="">
            {props.children} 
        </main>
    );
}

export default Container;