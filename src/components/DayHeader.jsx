import React from "react";
import { DAYS_LIST } from "../utility/constants";

const DayHeader = () => (
  <div className="day-header-container">
    {DAYS_LIST.map((day) => (
      <div className="day-header" key={day}>
        {day}
      </div>
    ))}
  </div>
);

export default DayHeader;
