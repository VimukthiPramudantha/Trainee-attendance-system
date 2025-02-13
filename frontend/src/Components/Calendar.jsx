// Calendar.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date()); // State to keep track of selected date

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the date when the user selects a date
  };

  return (
    <div className="calendar-container">
      <h2>Select a Date</h2>
      <Calendar
        onChange={handleDateChange} // Handle date change
        value={date} // Display selected date
      />
      <div>
        <p>Selected Date: {date.toDateString()}</p>{" "}
        {/* Display selected date */}
      </div>
    </div>
  );
};

export default CalendarComponent;
