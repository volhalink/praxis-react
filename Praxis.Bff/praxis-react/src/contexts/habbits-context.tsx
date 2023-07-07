import { Dispatch, createContext, useContext, useReducer } from 'react';

export interface Habit {
    id: string | null
    name: string
}

interface HabitsState {
    habits: Habit[],
    selectedHabit: Habit | null
}

export type HabitDispatchAction = "getall" | "add" | "delete" | "select" | "deselect";

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
        selectedHabit: null
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
        case "delete":
                const deleteHabit = action.data as Habit;
                return deleteHabit? {
                    ...oldState,
                    habits: oldState.habits.filter((h, i) => h.id !== deleteHabit.id)
                 } : oldState;
        case "select":
            const selectHabit = action.data as Habit;
            return  selectHabit?  {
                ...oldState,
                selectedHabit: selectHabit
            } : oldState;
        case "deselect":
            return  {
                ...oldState,
                selectedHabit: null
            };
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
  }