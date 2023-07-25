import { Dispatch, createContext, useContext, useReducer } from 'react';

export interface User {
    isLoggedIn: boolean;
    name: string;
    email: string;
    picture: string | null;
    locale: string;
    timezone: string;
};

export interface UserState {
    user: User,
    showSpinner: boolean
};

export interface Timezone {
    name: string,
    offset: number
};

export const anonymousUser = {isLoggedIn: false, name: '', email: '', picture: null, locale: 'en', timezone: 'UTC'};
const defaultState = {user: anonymousUser, showSpinner: false};

export type UserDispatchAction = "login" | "logout" | "setspinner";

export interface UserStateDispatch {
    type: UserDispatchAction,
    user?: User,
    showSpinner?: boolean
}

interface PropsType {
    user: User,
    children: JSX.Element
}

const UserStateContext = createContext<UserState>(defaultState);
const UserStateDispatchContext = createContext<Dispatch<UserStateDispatch> | null>(null);


export function UserStateProvider(props: PropsType) {
    const initialState = {user: props.user, showSpinner: false};
    const [userState, userStateDispatch] = useReducer(
        userStateReducer,
        initialState
    );

    return (
        <UserStateContext.Provider value={userState}>
            <UserStateDispatchContext.Provider value={userStateDispatch}>
            <div data-testid="user-state-provider">
            {props.children}
            </div>
            </UserStateDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

export function useUserState() {
    return useContext(UserStateContext);
}

export function useUserStateDispatch() {
    return useContext(UserStateDispatchContext);
}

function userStateReducer(olduserstate: UserState, action: UserStateDispatch) :UserState {
    switch (action.type) {
        case "login": 
            return {
                user: action.user ?? olduserstate.user,
                showSpinner: false,
            }
        case "logout":
            return defaultState;
        case "setspinner":
            return {
                ...olduserstate,
                showSpinner: !!(action.showSpinner)
            }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}