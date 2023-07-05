import { Dispatch, createContext, useContext, useReducer } from 'react';

export interface User {
    isLoggedIn: boolean;
    name: string;
    email: string;
}

export const anonymousUser = {isLoggedIn: false, name: '', email: ''}

export type UserDispatchAction = "login" | "logout";

export interface UserDispatch {
    type: UserDispatchAction,
    user: User
}

interface PropsType {
    children: JSX.Element
}

const UserContext = createContext<User | null>(null);
const UserDispatchContext = createContext<Dispatch<UserDispatch> | null>(null);


export function UserProvider(props: PropsType) {
    const [user, userDispatch] = useReducer(
      userReducer,
      anonymousUser
    );
  
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={userDispatch}>
            <div data-testid="user-provider">
            {props.children}
            </div>
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
  }

  export function useUser() {
    return useContext(UserContext);
  }
  
  export function useUserDispatch() {
    return useContext(UserDispatchContext);
  }

  function userReducer(olduser: User, action: UserDispatch) {
    switch (action.type) {
        case "login": 
            return action.user;
        case "logout":
            return anonymousUser;
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
  }