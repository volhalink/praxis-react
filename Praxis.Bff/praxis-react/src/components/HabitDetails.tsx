import { useState, useEffect } from "react";
import { Habit, useHabits, useHabitsDispatch } from "../contexts/habbits-context";
import { updateHabitAsync } from "../services/habbits-service";
import Input from "./utils/Input";
import Textarea from './utils/Textarea';

interface EditHabitFormProps {
    initialHabitName: string,
    initialHabitDescription: string,
    saveEditing: (newName: string, newDescription: string) => Promise<void>,
    cancelEditing: () => void
}

function EditHabitForm(props: EditHabitFormProps){
    const {initialHabitName, initialHabitDescription, saveEditing, cancelEditing} = props;
    const [habitName, setHabitName] = useState<string>(initialHabitName);
    let nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setHabitName(text);

    };
    const [habitDescription, setHabitDescription] = useState<string>(initialHabitDescription);
    let descriptionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setHabitDescription(text);
    };
    const onSaveEditing = async() => {
        await saveEditing(habitName, habitDescription);
    }

    useEffect(() => {
        setHabitName(initialHabitName);
        setHabitDescription(initialHabitDescription);
    },[initialHabitName, initialHabitDescription]);
    
    return (
        <div className="relative ml-[5%] mt-3 max-w-[90%]">
            <div className="text-main-dark">
                <div key={initialHabitName} className="mt-2 flex flex-nowrap justify-between items-center">
                    <Input label="Name" required={true} text={habitName} onTextChange={nameChanged} />
                </div>
                <div key={initialHabitDescription} className="mt-2">
                    <Textarea label="Description" text={habitDescription} onTextChange={descriptionChanged} />
                </div>
            </div>
            <div className="my-3 relative flex justify-end items-center">
                <div className="w-fit">
                    <button disabled={!habitName} className="p-2 rounded-md bg-main-btnsave-bg disabled:bg-main-btnsave-bg/20 text-main-btnsave-text disabled:text-main-btnsave-text/20 uppercase font-semibold tracking-wide" onClick={onSaveEditing}>
                        Save
                    </button>
                    <button className="ml-1 p-2 rounded-md bg-main-btncancel-bg text-main-btncancel-text uppercase font-semibold tracking-wide" onClick={cancelEditing}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}



function HabitDetails() {
    const habitsState = useHabits();
    const habitsDispatch = useHabitsDispatch();
    const initialHabitName = habitsState?.selectedHabit?.name ?? "";
    const initialHabitDescription = habitsState?.selectedHabit?.description ?? "";
    
    const [isEditingForm, setIsEditingForm] = useState<boolean>(false);
    const edit = () => {
        setIsEditingForm(true);
    }
    const cancelEditing = () => {
        setIsEditingForm(false);
    }
    const saveEditing = async(newHabitName: string, newHabitDescription: string) => {
        if(habitsState?.selectedHabit){
            const updateHabit: Habit = {
                ...habitsState.selectedHabit,
                name: newHabitName,
                description: newHabitDescription
            };
            await updateHabitAsync(updateHabit, habitsDispatch);
            setIsEditingForm(false);
        }
    }
    
    const close = () => {
        if(habitsDispatch){
            habitsDispatch({
                type: "deselect",
                data: null
            });
        }
    }

    return (
        <section className="relative grid content-start min-h-fit md:max-w-md w-full rounded-lg bg-main-light shadow-xl shadow-main-shadow/[0.5] overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex justify-between text-main-light bg-main-dark/[0.9]">
                <div className="uppercase font-normal tracking-widest">{initialHabitName}</div>
                <div className="flex items-center justify-between">
                    {
                        !isEditingForm? <button className="mr-1" onClick={edit}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="headerIconSmall">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button> : <button className="mr-1" onClick={cancelEditing}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    }
                    <button onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                {isEditingForm?
                  <EditHabitForm initialHabitName={initialHabitName} initialHabitDescription={initialHabitDescription} saveEditing={saveEditing} cancelEditing={cancelEditing} ></EditHabitForm>
                : <div className="m-3">
                    <div className={initialHabitDescription? "p-2 w-full rounded-lg border-2 border-main-highlight-light border-spacing-1" : "hidden"}>
                        <div className="text-main-dark tracking-wide italic">
                            {initialHabitDescription?.split('\n').map(s => <div>{s}</div>) ?? ""}
                        </div>
                    </div>
                </div>
                }
            </div>
        </section>
    );
}

export default HabitDetails;