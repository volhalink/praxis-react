import { DateTime } from "luxon";
import { useState } from "react";

const getWeekdayName = (ISODate: string) =>  DateTime.fromISO(ISODate).toFormat('ccccc');

const weekdayDateMap = {
    Mon: getWeekdayName('2023-07-24T00:00:00.000Z'),
    Tue: getWeekdayName('2023-07-25T00:00:00.000Z'),
    Wed: getWeekdayName('2023-07-26T00:00:00.000Z'),
    Thu: getWeekdayName('2023-07-27T00:00:00.000Z'),
    Fri: getWeekdayName('2023-07-28T00:00:00.000Z'),
    Sat: getWeekdayName('2023-07-29T00:00:00.000Z'),
    Sun: getWeekdayName('2023-07-30T00:00:00.000Z'),
  };


interface CalendarProps {
    year: number,
    month: number,
    selectedDate: DateTime,
    onSelect: (date: DateTime) => void
}

function Calendar(props: CalendarProps) {
    const {year, month, selectedDate, onSelect} = props;
    const getDate = (y: number, m: number, d: number) => DateTime.fromISO(`${y}-${m < 10? "0" + m : m}-${d < 10? "0" + d : d}T00:00:00.000`);

    const initialFirstDay = getDate(year, month, 1);
    const [firstDay, setFirstDay] = useState(initialFirstDay);
    const hasSelected = selectedDate.year === firstDay.year && selectedDate.month === firstDay.month;
    
    const items = [];
    let i = 1;
    while(i < firstDay.weekday) {
        items.push(<div className="w-8 h-8 disabled"></div>);
        i++;
    }
    while(firstDay.daysInMonth && i >= firstDay.weekday && i < firstDay.weekday + firstDay.daysInMonth){
        const day = i - firstDay.weekday + 1;
        items.push(<div className={"w-8 h-8 flex items-center justify-around " + (hasSelected && selectedDate.day === day? "w-full h-full rounded-full border-2 border-main-dark" : "")}>
            <button onClick={() => onSelect(getDate(firstDay.year, firstDay.month, day))} className="w-full h-full">{day}</button>
        </div>);
        i++;
    }
    while(firstDay.daysInMonth && i >= firstDay.weekday + firstDay.daysInMonth && i <= 42) {
        items.push(<div className="w-8 h-8 disabled"></div>);
        i++;
    }

    const back = () => {
        const newDate = getDate(firstDay.month === 1? firstDay.year - 1 : firstDay.year, firstDay.month === 1? 12 : firstDay.month - 1, 1);
        setFirstDay(newDate);
    }

    const forward = () => {
        const newDate = getDate(firstDay.month === 12? firstDay.year + 1 : firstDay.year, firstDay.month === 12? 1 : firstDay.month + 1, 1);
        setFirstDay(newDate);
    }

    return (<div className="w-64 bg-main-light disabled:bg-stone-50">
        <div className="p-1 border border-main-dark/[0.1]">
        <div className="p-1 border border-main-dark/[0.2]">
        <div className="">
            <div className="p-1 flex justify-around items-center">
                <div className="w-8 h-8 text-main-dark/[0.5]">
                    <button onClick={back}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    </button>
                </div>
                <div className="flex-grow h-8 flex justify-around items-center bold tracking-wider"><div>{firstDay.toFormat('yyyy LLL')}</div></div>
                <div className="w-8 h-8 text-main-dark/[0.5]">
                    <button onClick={forward}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    </button>
                </div>
            </div>
            <div className="px-2  flex">
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Mon}</div></div>
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Tue}</div></div>
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Wed}</div></div>
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Thu}</div></div>
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Fri}</div></div>
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Sat}</div></div>
                <div className="flex-grow-0 flex-shrink-0 flex justify-around items-center w-8 h-8 font-bold"><div>{weekdayDateMap.Sun}</div></div>
            </div>
            <div className="px-2 grid grid-cols-7 h-48">
                {items.map(i => i)}
            </div>
        </div>
        </div>
        </div>
    </div>)
}

export default Calendar;