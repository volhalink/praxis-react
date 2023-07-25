
import { Dispatch } from "react";
import { HistoryItem, HistoryDispatch } from "../contexts/history-context";
import { DateTime } from 'luxon';

const getHistoryUrl = "/api/habits/history";
const accomplishUrl = "/api/habits/accomplish";
const deleteAccomplishmentUrl = "/api/habits/accomplish?";

interface HistoryItemDto {
    id: string,
    habitId: string,
    accomplishmentDate: string,
    comment: string
}

export const getHistoryAsync = async (): Promise<HistoryItem[]>  => {
    const response = await fetch(getHistoryUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const history: HistoryItemDto[] = await response.json();
    if(history && history.length > 0) {
        const historyInLocalTime = history.map(h => { return {
            id: h.id,
            habitId: h.habitId,
            accomplishmentDate: DateTime.fromISO(h.accomplishmentDate),
            comment: h.comment,
        }});
        
        return historyInLocalTime;
    }

    return [];
}

export const accomplishAsync = async (historyItem: HistoryItem, dispatch: Dispatch<HistoryDispatch> | null) => {
    if(dispatch){
        const response = await fetch(accomplishUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(historyItem),
        });
        const result: HistoryItemDto = await response.json();
        if(result) {
            const hi = {
                ...result,
                accomplishmentDate: DateTime.fromISO(result.accomplishmentDate)
            }
            const action: HistoryDispatch = {
                type: "accomplish",
                data: hi
            }

            dispatch(action);
        }
    }
}

export const deleteAccomplishmentAsync = async (id: string, dispatch: Dispatch<HistoryDispatch> | null) => {
    if(dispatch && id){
        const params = (new URLSearchParams([
            ["id", id],
        ])).toString();
        const response = await fetch(deleteAccomplishmentUrl + params, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result: string | null = await response.json();
        if(result) { 
            const action: HistoryDispatch = {
                type: "delete",
                data: result
            }

            dispatch(action);
        }
    }
}