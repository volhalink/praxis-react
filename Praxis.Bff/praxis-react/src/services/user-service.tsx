import { Dispatch } from 'react';
import { UserDispatch, User, anonymousUser } from '../contexts/user-context';

export const loginWithGoogleUrl = "/api/login/google";
export const logoutUrl = "/api/logout";

export const getUser = async(user: User | null, dispatch: Dispatch<UserDispatch> | null) => {
    if(dispatch){
        const response = await fetch('api/user', {
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        // TODO: test it
        if(user?.isLoggedIn && !data?.email){
            dispatch({
                type: 'logout',
                user: anonymousUser
            });
        } else {
            if(!user?.isLoggedIn && data?.email) {
                dispatch({
                    type: 'login',
                    user: {
                        isLoggedIn: true,
                        name: data.name,
                        email: data.email,
                    }
                });
            }
        }
    }
}