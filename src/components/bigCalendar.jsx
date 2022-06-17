import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Views } from "react-big-calendar";
import "./style.css";
import CalendarToolbar from "./toolbar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const DSBigCalendar = (props) => {
  const [eventList, setEventList] = useState(props.events);
  const [viewMode, setViewMode] = useState(
    props.viewMode ? props.viewMode : Views.MONTH
  );

  useEffect(() => {
    setEventList(props.events);
  }, [props.events]);

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.color,
      borderRadius: "3px",
      opacity: 0.9,
      color: "white",
      border: "0px",
      display: "block",
      fontSize: "0.8rem",
      fontWeight: "normal",
      minHeight: viewMode !== "month" ? "2rem" : "20px",
    };
    return {
      style: style,
    };
  };

  const onSelectToolbar = () => {
    props.onSelectToolbar();
  };

  const onChangeView = (view) => {
    setViewMode(view);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        defaultDate={moment().toDate()}
        defaultView={viewMode}
        views={["month", "week", "day"]}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: props.height ? props.height : "500px",
          width: props.width ? props.width : "1000px",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "white",
          borderRadius: "10px",
          padding: "15px",
          fontWeight: "bold",
        }}
        popup
        step={props.step ? props.step : 30} //Determines the selectable time increments in week and day views
        onSelectEvent={(event) => props.handleSelectEvent(event)}
        onSelectSlot={(slotInfo) => props.handleSelectSlot(slotInfo)}
        selectable
        dayLayoutAlgorithm={"overlap"}
        eventPropGetter={(event) => eventStyleGetter(event)}
        components={{
          toolbar: (props) =>
            CalendarToolbar({
              ...props,
              onSelectToolbar: onSelectToolbar,
              onChangeView: onChangeView,
            }),
          // month: {
          //   header: ({ month, localizer }) => localizer.format(month, "mmm"),
          // },
        }}
      />
    </div>
  );
};

export default DSBigCalendar;
