import { Dispatch, createContext, useContext, useReducer } from 'react';
import {DateTime} from 'luxon';

export interface HistoryItem {
    id: string | null,
    habitId: string,
    accomplishmentDate: DateTime,
    comment: string
}

interface HistoryState {
    history: HistoryItem[]
}

export type HistoryDispatchAction = "load" | "accomplish" | "delete";

export interface HistoryDispatch {
    type: HistoryDispatchAction,
    data: HistoryItem | HistoryItem[] | string | null
}

interface PropsType {
    history: HistoryItem[],
    children: JSX.Element
}

const HistoryContext = createContext<HistoryState | null>(null);
const HistoryDispatchContext = createContext<Dispatch<HistoryDispatch> | null>(null);


export function HistoryProvider(props: PropsType) {
    const initialHistory: HistoryItem[] = props.history;
    const initialState = {
        history: initialHistory
    };
    const [historyState, historyDispatch] = useReducer(
        historyReducer,
        initialState
    );

    return (
        <HistoryContext.Provider value={historyState}>
            <HistoryDispatchContext.Provider value={historyDispatch}>
            <div data-testid="history-provider">
            {props.children}
            </div>
            </HistoryDispatchContext.Provider>
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    return useContext(HistoryContext);
}

export function useHistoryDispatch() {
    return useContext(HistoryDispatchContext);
}

function historyReducer(oldState: HistoryState, action: HistoryDispatch) : HistoryState {
    switch (action.type) {
        case "load": 
            return {
                ...oldState,
                history: action.data as HistoryItem[]
            };
        case "accomplish":
            const accomplishmentToUpdate = action.data as HistoryItem;
            return action.data? {
                ...oldState,
                history: oldState.history.filter((hi, i) => !(hi.id === accomplishmentToUpdate.id)).concat(accomplishmentToUpdate)
            } : oldState;
        case "delete":
                const accomplishmentIdToDelete = action.data as string;
                console.log("delete", accomplishmentIdToDelete);
                return accomplishmentIdToDelete? {
                    ...oldState,
                    history: oldState.history.filter((hi, i) => !(hi.id === accomplishmentIdToDelete))
                } : oldState;
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export function getHistoryItem(habitId: string, date: DateTime, comment: string) {
    return {
        id: null,
        habitId: habitId,
        accomplishmentDate: date,
        comment: comment
    }
}