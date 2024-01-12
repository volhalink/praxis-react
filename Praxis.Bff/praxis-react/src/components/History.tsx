import { useState } from 'react';
import { Habit, useHabits } from '../contexts/habits-context';
import { useHistory } from '../contexts/history-context';
import HabitHistoryForTheDate from './progress/HabitHistoryForTheDate';
import {DateTime} from 'luxon';
import Calendar from './utils/Calendar';

function History() {
    const habitsState = useHabits();
    const habitsHistoryState = useHistory();
    const [date, setDate] = useState<DateTime>(DateTime.now());
    

    return (
        <div className="min-h-screen">
            <div className="flex justify-around xxs:block pt-3 xxs:p-3">
                <Calendar year={date.year} month={date.month} selectedDate={date} onSelect={(d: DateTime) => setDate(d)}/>
            </div>
            <div className="p-3 sm:flex items-start">
                <div className="p-3 flex-grow-0">
                {habitsState?.habits.filter(h => h.isInProgress).map(h =>
                    <section key={h.id} className="pb-1 font-semibold tracking-wider text-main-dark/[0.8]">
                        <div className="relative grid content-start min-h-fit md:max-w-md w-full rounded-lg bg-main-light shadow-xl shadow-main-shadow/[0.5] overflow-hidden">
                            <div className="uppercase font-normal tracking-wide">{h.name}</div>
                            <div className="p-3">
                                <HabitHistoryForTheDate date={date}  habitHistory={habitsHistoryState?.history.filter(hi => hi.habitId === h.id) ?? []} format="datetime" />
                            </div>
                        </div>
                    </section>
                )}
                </div>
            </div>
        </div>
    );
}

export default History;