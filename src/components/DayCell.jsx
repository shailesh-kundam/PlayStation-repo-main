import React from "react";
import { format } from "date-fns";

const DayCell = ({ day, dayInMonth, gameRelease, handleDateClick }) => (
  <div className={`day-cell ${!dayInMonth ? "disabled" : ""}`}>
    {dayInMonth && gameRelease ? (
      <div
        className="image-wrapper"
        onClick={() => handleDateClick(gameRelease)}
        data-testid="game-day"
      >
        <div className="day-number">{format(day, "d")}</div>
        <img
          src={gameRelease.imageUrl}
          alt={gameRelease.title}
          className="game-image"
        />
      </div>
    ) : (
      <div className="day-number" data-testid="no-game-day">
        {dayInMonth ? format(day, "d") : ""}
      </div>
    )}
  </div>
);

export default DayCell;
