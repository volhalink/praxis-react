import { Dispatch } from "react";
import { Habit, HabitsDispatch } from "../contexts/habits-context";

const addHabitUrl = "/api/habits";
const updateHabitUrl = "/api/habits?"
const getAllHabitsUrl = "/api/habits/all";
const deleteHabitUrl = "/api/habits?";
const goAboutItUrl = "/api/habits/goaboutit?";
const stopProgressUrl = "/api/habits/stopprogress?";

export const getAllHabitsAsync = async() : Promise<Habit[]> => {
    const response = await fetch(getAllHabitsUrl, {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data: Habit[] = await response.json(); 

    return data;
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

export const updateHabitAsync = async (habit: Habit, dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch){
        const response = await fetch(updateHabitUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(habit),
        });
        const data: Habit = await response.json();
        if(data){
            const action: HabitsDispatch = {
                type: "update",
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

export const goAboutItAsync = async (habit: Habit, dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch && habit.id){
        const params = (new URLSearchParams([
            ["habitId", habit.id],
          ])).toString();
        const response = await fetch(goAboutItUrl + params, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deleted: boolean = await response.json();
        if(deleted){
            const action: HabitsDispatch = {
                type: "go_about_it",
                data: habit
            }

            dispatch(action);
        }
    }
}

export const stopProgressAsync = async (habit: Habit, dispatch: Dispatch<HabitsDispatch> | null) => {
    if(dispatch && habit.id){
        const params = (new URLSearchParams([
            ["habitId", habit.id],
          ])).toString();
        const response = await fetch(stopProgressUrl + params, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deleted: boolean = await response.json();
        if(deleted){
            const action: HabitsDispatch = {
                type: "stop_progress",
                data: habit
            }

            dispatch(action);
        }
    }
}