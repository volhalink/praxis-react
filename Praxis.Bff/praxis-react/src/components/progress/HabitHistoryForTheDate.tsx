import { deleteAccomplishmentAsync } from '../../services/history-service';
import { HistoryItem, useHistoryDispatch } from '../../contexts/history-context';
import {DateTime} from 'luxon';

export type HabitHistoryForTheDateFormat = "datetime" | "time";
export interface HabitHistoryForTheDateProps {
    date: DateTime,
    habitHistory: HistoryItem[],
    format: HabitHistoryForTheDateFormat,
}

function HabitHistoryForTheDate(props: HabitHistoryForTheDateProps) {
    const {date, habitHistory, format} = props;
    const dispatch = useHistoryDispatch();

    const isToday = (d: DateTime) => {
        return date.hasSame(d, 'day');
    }
    const history = habitHistory.filter(hi => isToday(hi.accomplishmentDate))/*.sort((a,b) => {
        const d = (b as any).accomplishmentDate.diff(a.accomplishmentDate);
        return d.milliseconds;
    })*/;
    
    const deleteAccomplishment = (id: string) => {
        deleteAccomplishmentAsync(id, dispatch);
    }

    return (
    <div className="text-main-dark">      
        {
            history.map(hi => {
                const dateTimeToShow = format === "datetime"? hi.accomplishmentDate.toLocaleString(DateTime.DATETIME_MED)
                                    : hi.accomplishmentDate.toLocaleString(DateTime.TIME_24_SIMPLE);
                return <div className="flex items-center justify-between">
                    <div className="flex-shrink-0 italic">{dateTimeToShow}</div>
                    <div className="ml-2 flex-grow">{hi.comment}</div>
                    <div className="flex-grow-0 flex items-center">
                        <button onClick={() => hi.id && deleteAccomplishment(hi.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="headerIconSmall">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </button>
                    </div>
                </div>
            })
        }
    </div>);
}

export default HabitHistoryForTheDate;