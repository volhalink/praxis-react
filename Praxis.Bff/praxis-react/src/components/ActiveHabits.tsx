import { useState } from 'react';
import { Habit, useHabits } from '../contexts/habits-context';


interface HabitTileProps {
    habit: Habit
}

function HabitTile(props: HabitTileProps) {
    const {habit} = props;
    const [expand, setExpand] = useState(false);

    return (<div className="w-full h-full rounded-lg font-semibold tracking-wider text-main-dark/[0.8] bg-main-light border border-main-dark/[0.5] shadow-lg shadow-main-shadow/[0.5]">
        <button className="w-full h-full" onClick={() => setExpand(!expand)}>
            <div className="p-2">
                <div className="border-b border-main-dark">{habit.name}</div>
                <div>
                    {!expand?
                    <div>Short progress</div>
                    :<div>Expanded progress</div>}
                </div>
            </div>
        </button>
    </div>);
}


function ActiveHabits() {
    const habitsState = useHabits();

    return (
        <div className="min-h-screen">
            <div className="p-3 sm:flex items-start">
                {habitsState?.habits.filter(h => h.isInProgress).map(h =>
                    <div key={h.id} className="pb-1 mx-[1%] w-[98%] sm:w-96">
                        <HabitTile habit={h} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActiveHabits;