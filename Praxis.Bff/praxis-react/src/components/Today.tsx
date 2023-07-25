import React, { useState } from 'react';
import { Habit, useHabits } from '../contexts/habits-context';
import { HistoryItem, useHistory, getHistoryItem, useHistoryDispatch } from '../contexts/history-context';
import { accomplishAsync, deleteAccomplishmentAsync } from '../services/history-service';
import {DateTime} from 'luxon';

interface AccomplishmentFormProps {
    habitId: string,
    today: DateTime,
}

function AccomplishmentForm(props: AccomplishmentFormProps) {
    const {habitId, today} = props;
    const dispatch = useHistoryDispatch();
    const [comment, setComment] = useState('');

    const complete = () => {
        const historyOfToday = getHistoryItem(habitId, today, comment);
        setComment('');
        accomplishAsync(historyOfToday, dispatch);
    }

    return (
        <div className="flex width-full justify-around items-center text-main-dark">
            <div className="w-full">
                <input className="w-full border border-main-highlight-dark/60" value={comment} onChange={(e) => {setComment(e.target.value)}}></input>
            </div>
            <div className="ml-1 flex-grow-0 flex items-center">
                <button onClick={complete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
        </div>
    );
}


interface HistoryForToday {
    date: DateTime,
    habitHistory: HistoryItem[],
    showExactDateTime: boolean
}

function HabitHistoryForTheDate(props: HistoryForToday) {
    const {date, habitHistory, showExactDateTime} = props;
    const dispatch = useHistoryDispatch();

    const isToday = (d: DateTime) => {
        return date.hasSame(d, 'day');
    }
    const history = habitHistory.filter(hi => isToday(hi.accomplishmentDate))/*.sort((a,b) => {
        const d = (b as any).accomplishmentDate.diff(a.accomplishmentDate);
        return d.milliseconds;
    })*/;
    
    const deleteAccomplishment = (id: string) => {
        deleteAccomplishmentAsync(id, dispatch);
    }

    return (
    <div className="text-main-dark">      
        {
            history.map(hi => {
                return <div className="flex items-center justify-between">
                    <div className="flex-shrink-0 italic">{showExactDateTime? hi.accomplishmentDate.toLocaleString(DateTime.DATETIME_MED) : hi.accomplishmentDate.diffNow().toHuman()}</div>
                    <div className="ml-2 flex-grow">{hi.comment}</div>
                    <div className="flex-grow-0 flex items-center">
                        <button onClick={() => hi.id && deleteAccomplishment(hi.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </button>
                    </div>
                </div>
            })
        }
    </div>);
}

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
                    <HabitHistoryForTheDate date={today}  habitHistory={habitHistory} showExactDateTime={true} />
                </div>}
                <div className="p-3">
                    {habit.id && <AccomplishmentForm today={today} habitId={habit.id} />}
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
                    <div className="pb-1 font-semibold tracking-wider text-main-dark/[0.8]">
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