import { format } from 'date-fns'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './dateFunction.css'

export function getCurDate(f) {
    if (f === undefined)
        f = "yyyy-MM-dd";
    const now = Date.now();
    try {
        let date = format(Date.now(), f);
        return date;

    } catch (err) {
        return now;
    }

}


export function getCurTime() {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss')

}



const SelectDateRange = ({ onFilterChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

    const handleFilter = () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        console.log('Selected date range:', formattedStartDate, formattedEndDate);
        onFilterChange(formattedStartDate, formattedEndDate);
    };

    return (
        <div className="custom-datepicker">
            <span>From:</span>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="date-picker-input"
            />
            <span>To:</span>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="date-picker-input"
            />
            <button onClick={handleFilter} className="apply-filter-btn">
                Apply Filter
            </button>
        </div>
    )

}
export { SelectDateRange };
