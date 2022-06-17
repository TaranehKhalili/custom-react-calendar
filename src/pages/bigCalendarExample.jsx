import React, { useEffect, useState } from "react";
import DSBigCalendar from "../components/bigCalendar";
import EventPopover from "./event-popover";
import colorPallete from "./mock-data/color-pallete.json";
import data from "./mock-data/mock-data.json";

const BigCalendarExample = () => {
  const [events, setEvents] = useState(
    data.map((item) => {
      return {
        id: item.id,
        start: new Date(item.start),
        end: new Date(item.end),
        title: item.title,
        color:
          "#" + colorPallete[Math.floor(Math.random() * colorPallete.length)],
      };
    })
  );
  const [selectedEvent, setSelectedEvent] = useState();
  const [showEventPopover, setShowEventPopover] = useState(false);
  const [clickPosition, setClickPosition] = useState({
    clientX: "0",
    clientY: "0",
  });

  useEffect(() => {}, [events]);

  function getMousePos(event) {
    setClickPosition({ clientX: event.clientX, clientY: event.clientY });
  }

  const onSelectSlot = (slotInfo) => {
    setShowEventPopover(false);
    setSelectedEvent();
  };
  const onSelectEvent = (event) => {
    document.addEventListener("click", getMousePos);
    setSelectedEvent(event);
    setShowEventPopover(true);
  };

  document.addEventListener("mouseup", function (e) {
    var container = document.getElementById("container");
    if (container && !container.contains(e.target)) {
      setShowEventPopover(false);
    }
  });

  return (
    <div id="container">
      <DSBigCalendar
        events={events}
        handleSelectSlot={onSelectSlot}
        handleSelectEvent={onSelectEvent}
        onSelectToolbar={() => {
          setShowEventPopover(false);
        }}
      />
      {selectedEvent && (
        <EventPopover
          show={showEventPopover}
          selectedEvent={selectedEvent}
          clickPosition={clickPosition}
          onClickPopover={() => {
            setSelectedEvent();
            setShowEventPopover(false);
          }}
        />
      )}
    </div>
  );
};

export default BigCalendarExample;
