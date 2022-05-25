import React, { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isEqual,
  isSameMonth,
  isToday,
  endOfWeek,
  startOfWeek,
  parseISO,
  startOfMonth,
  isAfter,
  isBefore,
  isSameDay,
} from "date-fns";
import cn from "classnames";

import RightChevron from "./icon/rightChevron";
import LeftChevron from "./icon/leftChevron";

const CustomDatePicker = () => {
  const emptyArray = [];
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState();
  const [currentMonth, setCurrentMonth] = useState(format(today, "yyyy-MM-dd"));
  const [rageDay, setRageDay] = useState(emptyArray);

  const firstDayCurrentMonth = startOfMonth(parseISO(currentMonth));
  const firstDayInWeek = startOfWeek(firstDayCurrentMonth);
  const lastDayInWeek = endOfWeek(endOfMonth(firstDayCurrentMonth));

  const days = eachDayOfInterval({
    start: firstDayInWeek,
    end: lastDayInWeek,
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "yyyy-MM-dd"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "yyyy-MM-dd"));
  };

  const centringAbsolute =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

  const hoveringState =
    "border rounded-full p-4 border-primary hover:bg-indigo-300";

  const checkSameMonth = (day) => {
    return isSameMonth(day, parseISO(currentMonth));
  };

  const isSelectedDay = (day) => {
    return isEqual(day, selectedDay);
  };

  //temporal logic only for demo
  const resetState = () => {
    setRageDay([]);
  };
  const isTwoDaysInRage = rageDay.length >= 2;
  const rageDays = (day) => {
    if (isTwoDaysInRage) {
      resetState();
      setRageDay((currentState) => [...currentState, day]);
    } else {
      setRageDay((currentState) => [...currentState, day]);
    }
  };

  const range = (day) => isAfter(day, rageDay[0]) && isBefore(day, rageDay[1]);

  const sameDayFirst = (day) => {
    return isSameDay(day, rageDay[0]);
  };

  const sameDaySecond = (day) => {
    return isSameDay(day, rageDay[1]);
  };

  return (
    <div className="rounded border border-unscoped shadow-cont">
      <div className="bg-bcolor pt-2">
        <div className="flex items-center pt-4 px-4 justify-between">
          <button
            type="button"
            onClick={previousMonth}
            className={cn("relative", hoveringState)}
          >
            <LeftChevron classNames={centringAbsolute} />
          </button>
          <p className="text-center text-gray-900 font-mono">
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
      {selectedDay && !isTwoDaysInRage && (
        <div className="p-4 bg-unscoped text-sm text-center text-choosedate text-main">
          Choose a start date up to 6 weeks in advance
        </div>
      )}
      <div className="grid grid-cols-7 text-sm text-center mt-2">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={cn(
              "relative px-2 my-[2px] group",
              range(day) && "bg-hoverb"
            )}
          >
            <button
              type="button"
              onClick={() => {
                rageDays(day);
                setSelectedDay(day);
              }}
              className={cn(
                "p-4 border border-transparent",
                (isSelectedDay(day) || sameDayFirst(day)) &&
                  checkSameMonth(day) &&
                  "text-white rounded-full bg-primary",
                !checkSameMonth(day) && "text-unscoped",
                isToday(day) && "border !border-grayborder p-4 rounded-full",
                !isSelectedDay(day) &&
                  checkSameMonth(day) &&
                  !range(day) &&
                  "hover:border-primary hover:bg-hoverb group-active:bg-primaryactive hover:rounded-full transition-all",
                range(day) && "bg-hoverb",
                sameDaySecond(day) && "border-hoverb"
              )}
            >
              {/* timing logic to demonstrate how the range works */}
              <div
                className={cn(
                  sameDaySecond(day) &&
                    "shadow-[-30px_0_0_0px_rgba(204,204,255,1)] absolute w-8 h-[34px] top-0 right-[-10px] -z-10",
                  rageDay[1] &&
                    sameDayFirst(day) &&
                    "shadow-[30px_0_0_0px_rgba(204,204,255,1)] absolute w-8 h-[34px] top-0 left-[-10px] -z-10"
                )}
              />
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(centringAbsolute, "font-mono h-5 w-5")}
              >
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
      {isTwoDaysInRage && (
        <button
          className="p-4 text-primary font-main text-base"
          onClick={() => {
            resetState();
            setSelectedDay(null);
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default CustomDatePicker;
