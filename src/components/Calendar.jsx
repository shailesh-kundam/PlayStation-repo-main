import React, { useEffect, useState, Fragment } from "react";
import {
  addMonths,
  format,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  subMonths,
  startOfWeek,
  startOfMonth,
} from "date-fns";

import CalendarHeader from "./CalendarHeader";
import DayHeader from "./DayHeader";
import DayCell from "./DayCell";
import GameDetails from "./GameDetails";

import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameReleases, setGameReleases] = useState([]);

  // Getting query parameters from the URL.
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Function to set the next month as the current date.
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Function to set the previous month as the current date.
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Function to handle clicking a date, potentially selecting a game.
  const handleDateClick = (game) => {
    if (game?.date === selectedGame?.date) {
      setSelectedGame(null);
      return;
    }
    setSelectedGame(game);
  };

  // Function to render the calendar days as a grid.
  const renderCalendarDays = () => {
    // Calculating the relevant dates to display on the calendar.
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "yyyy-MM-dd";
    let weeks = [],
      week = [],
      dayIndex = 0;

    // Iterating over each day in the interval to create day cells.
    eachDayOfInterval({ start: startDate, end: endDate }).forEach((day) => {
      const formattedDate = format(day, dateFormat);
      const gameRelease = gameReleases.find(
        (game) => game.date === formattedDate
      );
      const dayInMonth = isSameMonth(day, monthStart);

      // Pushing each day cell to the week array.
      week.push(
        <DayCell
          key={day}
          day={day}
          dayInMonth={dayInMonth}
          gameRelease={gameRelease}
          handleDateClick={handleDateClick}
        />
      );

      dayIndex++;

      // After a week's worth of days, push the week to the weeks array and reset for a new week.
      if (dayIndex % 7 === 0) {
        weeks.push(week);
        week = [];
      }
    });

    // If there's an incomplete week, push it to the weeks array.
    if (week.length > 0) {
      weeks.push(week); // Push the remaining days if they don't make a full week
    }

    // Mapping each week to render a row in the calendar.
    return weeks.map((week, index) => (
      <Fragment key={index}>
        <div className="week-row">{week}</div>
        {selectedGame &&
        week.some(
          (dayCell) => dayCell.props.gameRelease?.date === selectedGame.date
        ) ? (
          <GameDetails game={selectedGame} />
        ) : null}
        {/* Using conditional statement to avoid shortcircuit situation*/}
      </Fragment>
    ));
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_GAME_API_URL)
      ?.then((response) => response.json())
      ?.then((games) => setGameReleases(games));

    let month = urlParams.get("month");
    let year = urlParams.get("year");

    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    // Check and correct the year if it is not four digits.
    if ((year && (year.length < 4 || year.length > 4)) || !year)
      year = currentYear;

    // Check and set the month to current if it is not between 1 and 12.
    if (!(Number(month) >= 1 && Number(month) <= 12) || !month)
      month = currentMonth;

    // Set the current date state based on the year and month.
    let str = `${month}/01/${year}`;
    setCurrentDate(new Date(str));
  }, []); // This effect runs once on component mount.

  // useEffect hook to update the URL with the current month and year when currentDate changes.
  useEffect(() => {
    if (currentDate !== "Invalid Date") {
      let currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
      let currentYear = currentDate.getFullYear();

      // Construct the new URL query parameters
      const newQueryString = `?year=${currentYear}&month=${currentMonth}`;

      // Use the HTML5 History API to update the URL without triggering a page refresh
      window.history.pushState({}, "", newQueryString);
      // Assuming you want to run this effect whenever currentDate changes
    }
  }, [currentDate]);

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <DayHeader />
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
