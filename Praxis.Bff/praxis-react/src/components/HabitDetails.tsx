import { Habit, useHabitsDispatch } from "../contexts/habbits-context";

interface HabitDetailsProps {
    habit: Habit
}

function HabitDetails(props: HabitDetailsProps) {
    const habitsDispatch = useHabitsDispatch();
    const close = () => {
        if(habitsDispatch){
            habitsDispatch({
                type: "deselect",
                data: null
            });
        }
    }

    return (
        <section className="grid content-start min-h-screen w-full rounded-lg bg-violet-light shadow-xl shadow-violet-dark overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex justify-between text-violet-light bg-violet-dark">
                <div>Details of {props.habit.name}</div>
                <div>
                    <button onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="">
                
            </div>
        </section>
    );
}

export default HabitDetails;