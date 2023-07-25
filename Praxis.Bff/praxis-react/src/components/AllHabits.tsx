import {useState} from 'react';
import { addHabitAsync, deleteHabitAsync, goAboutItAsync, stopProgressAsync } from '../services/habits-service';
import { Habit, useHabits, useHabitsDispatch } from '../contexts/habits-context';
import Input from './utils/Input';
import Textarea from './utils/Textarea';
import HabitDetails from './HabitDetails';

function AddHabitForm(){
    const habbitsDispatch = useHabitsDispatch();
    const [habitName, setHabitName] = useState<string>("");
    let nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setHabitName(text);
    };
    const [habitDescription, setHabitDescription] = useState<string>("");
    let descriptionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setHabitDescription(text);
    };
    const [showForm, setShowForm] = useState<boolean>(false);
    let onAddHabbitClick = async() => {
        let habit: Habit = {
            id: null,
            name: habitName,
            description: habitDescription,
            isInProgress: false,
        }
        setHabitName("");
        setHabitDescription("");
        await addHabitAsync(habit, habbitsDispatch);
    }

    return (
        <div>
            <div className="flex flex-nowrap justify-between items-center h-full w-full bg-main-dark/[0.6] text-main-light">
                <div className="ml-3">
                    <div className="py-1 font-medium uppercase tracking-wider">Add new habit</div>
                </div>
                <div className="mx-2 flex items-center">
                    <button className="" onClick={()=> { setShowForm(!showForm)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            {!showForm?<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            : <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />}
                        </svg>
                    </button>
                </div>
            </div>
            {showForm? 
                <div className="px-3 py-2 rounded-lg text-main-dark bg-main-light">
                    <div className="mt-2 flex flex-nowrap justify-between items-center">
                        <Input label="Name" text={habitName} onTextChange={nameChanged} />
                        <div className="grow-0 h-full ml-2">
                            <button className="py-1" onClick={onAddHabbitClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIcon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Textarea label="Description" text={habitDescription} onTextChange={descriptionChanged} />
                    </div>
                </div> : <div></div>}
        </div>
    );
}


function HabitsList() {
    const habitsState = useHabits();
    const habitsDispatch = useHabitsDispatch();

    const onClickDelete = (habit: Habit) =>{
        deleteHabitAsync(habit, habitsDispatch);
    };

    const onClickGoAboutIt = async(habit: Habit) =>{
        await goAboutItAsync(habit, habitsDispatch);
    };

    const onClickStopProgress = async(habit: Habit) =>{
        await stopProgressAsync(habit, habitsDispatch);
    };

    const selectHabit = (habit: Habit) => {
        if(habitsDispatch){
            if(habit.id === habitsState?.selectedHabit?.id){
                habitsDispatch({
                    type: "deselect"
                })
            } else {
                habitsDispatch({
                    type: "select",
                    data: habit
                })
            }   
        }
    }

    return (
        <div className="">{habitsState?.habits.map(h => 
            <div className="mt-3 flex flex-nowrap justify-between items-center border-b-2 border-b-main-dark">
                <div className="grow">
                    <button className={habitsState?.selectedHabit?.id === h.id? "font-bold tracking-wide" : ""} onClick={() => selectHabit(h)}>
                        {h.name}
                    </button>
                </div>
                <div className="grow-0 flex justify-around">
                    <div className="grow-0">
                    {h.isInProgress ? 
                            <button onClick={async() => await onClickStopProgress(h)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            : <button onClick={async() => await  onClickGoAboutIt(h)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                </svg>
                            </button>
                            }
                    </div>
                    <div className="grow-0">
                        <button onClick={() => {onClickDelete(h)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>)}
        </div>
    );
}

function AllHabits() {
    const habitsState = useHabits();
    return (
        <section className="flex sm:grid-cols-3 content-start min-h-screen"> 
            <div className="flex flex-grow-0 justify-around sm:justify-start">
                <div className="p-5 w-full hidden sm:block sm:max-w-sm">                 
                        <div className="">
                            <AddHabitForm />
                            <HabitsList />
                        </div>
                </div>
                <div className="p-5 w-full sm:hidden">
                {habitsState?.selectedHabit?
                        <HabitDetails></HabitDetails>
                        : <div className="">
                            <AddHabitForm />
                            <HabitsList />
                        </div>
                }
                </div>
            </div>
            <div className="m-5 flex-grow hidden sm:block">
                {habitsState?.selectedHabit && <HabitDetails></HabitDetails>}
            </div>
        </section>
    );
}

export default AllHabits;