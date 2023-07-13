import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      {/* <Calendar onChange={handleDateChange} value={selectedDate} /> */}
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
