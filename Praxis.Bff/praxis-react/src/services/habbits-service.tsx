import { Dispatch } from "react";
import { Habit, HabitsDispatch } from "../contexts/habbits-context";

const addHabbitUrl = "/api/habits";
const getAllHabbitsUrl = "/api/habits/all";

export const getAllHabbitsAsync = async(dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch){
        const response = await fetch(getAllHabbitsUrl, {
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data: Habit[] = await response.json();
        const action: HabitsDispatch = {
            type: "getall",
            data: data
        }

        dispatch(action);
    }
}

export const addHabbitAsync = async (habbit: Habit, dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch){
        const response = await fetch(addHabbitUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(habbit),
        });
        const data: Habit = await response.json();
        if(data){
            const action: HabitsDispatch = {
                type: "add",
                data: data
            }

            dispatch(action);
        }
    }
}