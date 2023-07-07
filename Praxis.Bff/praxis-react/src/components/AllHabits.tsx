import {useState, useEffect} from 'react';
import { getAllHabitsAsync, addHabitAsync, deleteHabitAsync } from '../services/habbits-service';
import { Habit, HabitsProvider, useHabits, useHabitsDispatch } from '../contexts/habbits-context';
import HabitDetails from './HabitDetails';

function AddHabitForm(){
    const habbitsDispatch = useHabitsDispatch();
    const [habbitName, setHabbitName] = useState<string>("");
    let textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setHabbitName(text);
    };
    let onAddHabbitClick = async() => {
        let habbit: Habit = {
            id: null,
            name: habbitName
        }
        setHabbitName("");
        addHabitAsync(habbit, habbitsDispatch);
    }

    return (
        <div className="flex flex-nowrap justify-between items-stretch">
            <div className="grow">
                <input className="h-full w-full bg-violet-dark text-violet-light" type="text" onChange={textChanged} value={habbitName}/>
            </div>
            <div className="grow-0 h-full ml-2">
                <button className="py-1" onClick={onAddHabbitClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIcon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}


function HabitsList() {
    const habitsState = useHabits();
    const habitsDispatch = useHabitsDispatch();

    const onClickDelete = (habit: Habit) =>{
        deleteHabitAsync(habit, habitsDispatch)
    };

    const selectHabit = (habit: Habit) => {
        if(habitsDispatch){
            habitsDispatch({
                type: "select",
                data: habit
            })
        }
    }

    return (
        <div className="">{habitsState?.habits.map(h => 
            <div className="mt-3 flex flex-nowrap justify-between items-center border-b-2 border-b-violet-dark">
                <div className="grow">
                    <button onClick={() => selectHabit(h)}>
                        {h.name}
                    </button>
                </div>
                <div className="ml-2 grow-0">
                    <button onClick={() => {onClickDelete(h)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>)}
        </div>
    );
}

function AllHabits() {
    const habitsState = useHabits();
    return (
        <section className="grid grid-cols-1 sm:grid-cols-3 content-start min-h-screen"> 
            <div className="flex justify-around sm:justify-start">
                <div className="p-5 w-full hidden sm:block sm:max-w-sm">                 
                        <div className="">
                            <AddHabitForm />
                            <HabitsList />
                        </div>
                </div>
                <div className="p-5 w-full sm:hidden">
                {habitsState?.selectedHabit?
                          <HabitDetails habit={habitsState?.selectedHabit}></HabitDetails>
                        : <div className="">
                            <AddHabitForm />
                            <HabitsList />
                        </div>
                }
                </div>
            </div>
            <div className="m-5 col-span-2 hidden sm:block">
                {habitsState?.selectedHabit && <HabitDetails habit={habitsState?.selectedHabit}></HabitDetails>}
            </div>
        </section>
    );
}

export default AllHabits;