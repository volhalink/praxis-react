import { useState } from 'react';
import { getHistoryItem, useHistoryDispatch } from '../../contexts/history-context';
import { accomplishAsync } from '../../services/history-service';
import {DateTime} from 'luxon';

export interface AccomplishmentFormProps {
    habitId: string,
    date: DateTime,
}

function AccomplishmentForm(props: AccomplishmentFormProps) {
    const {habitId, date} = props;
    const dispatch = useHistoryDispatch();
    const [comment, setComment] = useState('');

    const complete = () => {
        const accomplishment = getHistoryItem(habitId, date, comment);
        setComment('');
        accomplishAsync(accomplishment, dispatch);
    }

    return (
        <div className="flex width-full justify-around items-center text-main-dark">
            <div className="w-full">
                <input className="w-full border border-main-highlight-dark/60" value={comment} onChange={(e) => {setComment(e.target.value)}}></input>
            </div>
            <div className="ml-1 flex-grow-0 flex items-center">
                <button onClick={complete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
        </div>
    );
}

export default AccomplishmentForm;