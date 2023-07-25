import { useState } from 'react';
import { useUserState, useUserStateDispatch } from '../contexts/user-context';
import { setTimezone } from '../services/user-service';
import TimezoneSelctor from './TimezoneSelector';
import Spinner from './utils/Spinner'


function Profile() {
    const {user, showSpinner} = useUserState();
    const dispatch = useUserStateDispatch();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedTimezone, setSelectedTimezone] = useState<string>(user?.timezone ?? "");

    const onSetTimezone = () => {
        setIsEditing(false);
        if(dispatch) {
            setTimezone(user, selectedTimezone, dispatch);
        }
    }

    return (
        <div className="relative pl-5 pt-5 text-main-dark">
            {user?
                <div className="bg-main-light pb-3 max-w-sm md:max-w-md">
                    <div className="w-full">
                        <div className="flex justify-between ">
                            <div className="xxs:flex">
                                {user.picture? <div><img className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28" src={user.picture} alt="profile"/></div> : <div className="w-16 h-16 bg-olive-400"></div>}
                                <div className="py-2 px-3">
                                    <div className="font-semibold tracking-wide">{user.name}</div>
                                    <div className="font-normal italic tracking-wide">{user?.email}</div>
                                </div>
                            </div>
                            {dispatch && 
                                <div className="p-1 flex items-start justify-between">
                                    {isEditing && <div className="">
                                        <button onClick={onSetTimezone} className="">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>}
                                    <div>
                                    <button onClick={() => {setIsEditing(!isEditing)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                                            {!isEditing?
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                : <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            }
                                        </svg>
                                    </button>
                                    </div>
                            </div> }
                        </div>
                        <div className="px-3 pt-3 flex font-semibold tracking-wide">
                            <div className="font-thin tracking-tighter">Language: </div>
                            <div className="px-3">{user.locale}</div>
                        </div>
                        {isEditing && dispatch?
                            <div className="flex justify-between items-center text-main-dark">
                                <div className="grow w-[90%] mt-[1%] flex">
                                    <div className="flex-grow-0 px-3 font-thin tracking-tighter">Time zone: </div>
                                    <div className="flex-grow">
                                        <TimezoneSelctor initialTimezone={selectedTimezone} select={setSelectedTimezone}  />
                                    </div>
                                </div> 
                            </div>
                        : <div className="px-3 pt-3 flex font-semibold tracking-wide">
                            <div className="font-thin tracking-tighter">Time zone: </div>
                            <div className="px-3">{user.timezone}</div>
                            <div><Spinner show={showSpinner} /></div>
                        </div>
                        }
                    </div>
                </div>      
                : <div>Please, log in.</div>
            }
        </div>
    );
}

export default Profile;