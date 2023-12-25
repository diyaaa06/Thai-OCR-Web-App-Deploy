import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import a date picker library
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

export const DateRangePicker = ({ handleDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilter = () => {
    // Pass the selected start and end dates to the parent component
    handleDateRangeChange(startDate, endDate);
  };

  return (
    <div className="date-range-picker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Issue Date"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Issue Date"
      />
      <button onClick={handleFilter}>Apply</button>
    </div>
  );
};
