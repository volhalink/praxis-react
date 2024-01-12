import { useState } from 'react';
import { Habit, useHabits } from '../contexts/habits-context';
import { useHistory } from '../contexts/history-context';
import AccomplishmentForm from './progress/AccomplishmentForm';
import HabitHistoryForTheDate from './progress/HabitHistoryForTheDate';
import {DateTime} from 'luxon';

interface HabitHistoryProps {
    habit: Habit,
    close: () => void
}

function HabitHistory(props: HabitHistoryProps) {
    const {habit, close} = props
    const habitsHistoryState = useHistory();
    const habitHistory = habitsHistoryState?.history.filter(hi => hi.habitId === habit.id) ?? [];
    const today = DateTime.now();

    return (<div>
            {habit && 
            <section className="relative grid content-start min-h-fit md:max-w-md w-full rounded-lg bg-main-light shadow-xl shadow-main-shadow/[0.5] overflow-hidden">
                <div className="px-3 pt-3 pb-2 flex justify-between text-main-light bg-main-dark/[0.9]">
                        <div className="uppercase font-normal tracking-wide">{habit.name}</div>
                        <div className="flex-grow-0 flex items-center">
                            <button onClick={close}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                </div>
                {habitHistory.length > 0 && <div className="p-3">
                    <HabitHistoryForTheDate date={today}  habitHistory={habitHistory} format="time" />
                </div>}
                <div className="p-3">
                    {habit.id && <AccomplishmentForm date={today} habitId={habit.id} />}
                </div>
            </section>}
        </div>);
}

function Today() {
    const habitsState = useHabits();
    const [selectedHabit, setSelectedIdHabit] = useState<Habit | null> (null);

    const onShowHistory = (habit: Habit | null) => {
        if(selectedHabit && selectedHabit.id === habit?.id){
            setSelectedIdHabit(null);
        } else {
            setSelectedIdHabit(habit);
        } 
    }

    const close = () => {
        setSelectedIdHabit(null);
    }

    return (
        <div className="min-h-screen">
            <div className="p-3 sm:flex items-start">
                <div className="p-3 flex-grow-0">
                {habitsState?.habits.filter(h => h.isInProgress).map(h =>
                    <div key={h.id} className="pb-1 font-semibold tracking-wider text-main-dark/[0.8]">
                        <button onClick={() => onShowHistory(h)} >
                            <div className={"uppercase" + (selectedHabit && selectedHabit.id === h.id? " text-main-dark/[0.5]" : "")}>{h.name}</div>
                        </button>
                        {selectedHabit && selectedHabit.id === h.id && <div className="sm:hidden p-3 flex-grow">
                            <HabitHistory habit={selectedHabit} close={close} />
                        </div>}
                    </div>
                )}
                </div>
                <div className="hidden sm:block p-3 flex-grow">
                    {selectedHabit && <HabitHistory habit={selectedHabit} close={close} />}
                </div>
            </div>
        </div>
    );
}

export default Today;