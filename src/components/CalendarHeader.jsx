import React from "react";

const CalendarHeader = ({ currentDate, prevMonth, nextMonth }) => {
  // Using toLocaleString to format the date
  const formattedDate = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar-nav">
      <p data-testid="prev-month" onClick={prevMonth}>
        <span className="arrow right-arrow"></span>
      </p>
      <h1>{formattedDate}</h1>
      <p data-testid="next-month" onClick={nextMonth}>
        <span className="arrow left-arrow"></span>
      </p>
    </div>
  );
};

export default CalendarHeader;
