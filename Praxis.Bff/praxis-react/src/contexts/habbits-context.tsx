import { Dispatch, createContext, useContext, useReducer } from 'react';

export interface Habit {
    name: string
}

interface HabitsState {
    habits: Habit[],
}

export type HabitDispatchAction = "getall" | "add";

export interface HabitsDispatch {
    type: HabitDispatchAction,
    data: Habit | Habit[] | null
}

interface PropsType {
    children: JSX.Element
}

const HabitsContext = createContext<HabitsState | null>(null);
const HabitsDispatchContext = createContext<Dispatch<HabitsDispatch> | null>(null);


export function HabitsProvider(props: PropsType) {
    const initialHabits: Habit[] = [];
    const initialState = {
        habits: initialHabits,
    };
    const [habitsState, habitsDispatch] = useReducer(
      habbitsReducer,
      initialState
    );
  
    return (
        <HabitsContext.Provider value={habitsState}>
            <HabitsDispatchContext.Provider value={habitsDispatch}>
            <div data-testid="habits-provider">
            {props.children}
            </div>
            </HabitsDispatchContext.Provider>
        </HabitsContext.Provider>
    );
  }

  export function useHabits() {
    return useContext(HabitsContext);
  }
  
  export function useHabitsDispatch() {
    return useContext(HabitsDispatchContext);
  }

  function habbitsReducer(oldState: HabitsState, action: HabitsDispatch) : HabitsState {
    switch (action.type) {
        case "getall": 
            return {
                ...oldState,
                habits: action.data as Habit[]
            };
        case "add":
            return action.data? {
                ...oldState,
                habits: oldState.habits.concat([action.data as Habit])
             } : oldState;
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
  }