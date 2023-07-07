import { Dispatch } from "react";
import { Habit, HabitsDispatch } from "../contexts/habbits-context";

const addHabitUrl = "/api/habits";
const getAllHabitsUrl = "/api/habits/all";
const deleteHabitUrl = "/api/habits?";

export const getAllHabitsAsync = async(dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch){
        const response = await fetch(getAllHabitsUrl, {
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

export const addHabitAsync = async (habit: Habit, dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch){
        const response = await fetch(addHabitUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(habit),
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

export const deleteHabitAsync = async (habit: Habit, dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch && habit.id){
        const params = (new URLSearchParams([
            ["habitId", habit.id],
          ])).toString();
        const response = await fetch(deleteHabitUrl + params, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deleted: boolean = await response.json();
        if(deleted){
            const action: HabitsDispatch = {
                type: "delete",
                data: habit
            }

            dispatch(action);
        }
    }
}