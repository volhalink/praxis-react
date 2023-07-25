import { Dispatch } from 'react';
import { UserStateDispatch, User } from '../contexts/user-context';

export const loginWithGoogleUrl = "/api/login/google";
export const logoutUrl = "/api/logout";

const refreshUser = (oldUser: User, updatedUser: User, dispatch: Dispatch<UserStateDispatch>) => {
    if(oldUser?.isLoggedIn && !updatedUser?.isLoggedIn){
        dispatch({
            type: 'logout'
        });
    } else {
        if(updatedUser?.email) {
            dispatch({
                type: 'login',
                user: {
                    isLoggedIn: updatedUser.isLoggedIn,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    picture: updatedUser.picture,
                    locale: updatedUser.locale,
                    timezone: updatedUser.timezone,
                },
            });
        }
    }
}

export const getUser = async() : Promise<User> => {
    const response = await fetch('api/user', {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data: User = await response.json();
    return data;
}

export const setTimezone = async(user: User, timezone: string, dispatch: Dispatch<UserStateDispatch> | null)=> {
    if(dispatch){
        dispatch({
            type: 'setspinner',
            showSpinner: true
        });
        const params = (new URLSearchParams([
            ["timezone", timezone],
        ])).toString();
        const response = await fetch('api/user/settimezone?' + params, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        refreshUser(user, data, dispatch);
        dispatch({
            type: 'setspinner',
            showSpinner: false
        });
    }
}