import {useState, useEffect} from 'react';
import { getAllHabbitsAsync, addHabbitAsync } from '../services/habbits-service';
import { Habit, HabitsProvider, useHabits, useHabitsDispatch } from '../contexts/habbits-context';

function AddHabitForm(){
    const habbitsDispatch = useHabitsDispatch();
    const [habbitName, setHabbitName] = useState<string>("");
    let textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setHabbitName(text);
    };
    let onAddHabbitClick = async() => {
        let habbit: Habit = {
            name: habbitName
        }
        setHabbitName("");
        addHabbitAsync(habbit, habbitsDispatch);
    }

    return (
        <div className="flex">
            <input type="text" onChange={textChanged} value={habbitName}/>
            <button onClick={onAddHabbitClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIcon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
}


function HabitsList() {
    const habbitsState = useHabits();
    const habbitsDispatch = useHabitsDispatch();

    useEffect(() => {
        getAllHabbitsAsync(habbitsDispatch);
    }, [habbitsDispatch]);

    return (
        <div className="">{habbitsState?.habits.map(h => <div>{h.name}</div>)}</div>
    );
}

function AllHabbits() {
    return (
        <div className="min-h-screen">
            <HabitsProvider>
                <div>
                    <AddHabitForm />
                    <HabitsList />
                </div>
            </HabitsProvider>
        </div>
    );
}

export default AllHabbits;