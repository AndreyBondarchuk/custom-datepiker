import React, { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  endOfWeek,
  startOfWeek,
  parseISO,
  startOfToday,
  startOfMonth,
} from "date-fns";
import cn from "classnames";

import RightChevron from "./icon/rightChevron";
import LeftChevron from "./icon/leftChevron";

const CustomDatePicker = () => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState();
  let [currentMonth, setCurrentMonth] = useState(format(today, "yyyy-MM-dd"));
  let firstDayCurrentMonth = startOfMonth(parseISO(currentMonth));

  const firstDayInWeek = startOfWeek(firstDayCurrentMonth);

  const lastDayInWeek = endOfWeek(endOfMonth(firstDayCurrentMonth));

  // console.log(parseISO(currentMonth));

  const days = eachDayOfInterval({
    start: firstDayInWeek,
    end: lastDayInWeek,
  });

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "yyyy-MM-dd"));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "yyyy-MM-dd"));
  };

  const centringAbsolute =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

  const hoveringState =
    "border rounded-full p-4 border-blue-700 hover:bg-indigo-300";

  return (
    <div className="rounded shadow border border-gray-200">
      <div className="bg-gray-200 pt-2">
        <div className="flex items-center justify-around gap-8">
          <button
            type="button"
            onClick={previousMonth}
            className={cn("relative", hoveringState)}
          >
            <LeftChevron classNames={centringAbsolute} />
          </button>
          <p className="text-center text-gray-900">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </p>
          <button
            onClick={nextMonth}
            type="button"
            className={cn("relative", hoveringState)}
          >
            <RightChevron classNames={centringAbsolute} />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-3 text-xs leading-6 text-center text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm text-center">
        {days.map((day) => (
          <div key={day.toString()} className="relative">
            {/* {console.log(day, parseISO(currentMonth))} */}
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={cn(
                isEqual(day, selectedDay) &&
                  "text-white rounded-full bg-blue-800 text-center",
                !isSameMonth(day, parseISO(currentMonth)) && "text-gray-300",
                "p-4 border rounded-full border-transparent",
                isToday(day) && "border !border-gray-500 p-4 rounded-full",
                "hover:border-blue-700 hover:bg-indigo-300"
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={centringAbsolute}
              >
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDatePicker;
