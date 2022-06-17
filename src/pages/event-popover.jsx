import React from "react";

const EventPopover = ({
  show,
  selectedEvent,
  clickPosition,
  onClickPopover,
}) => {
  return (
    <div
      hidden={!show}
      onClick={(e) => {
        onClickPopover();
      }}
      style={{
        zIndex: "10000",
        position: "absolute",
        left: clickPosition.clientX,
        top: clickPosition.clientY,
        backgroundColor: selectedEvent.color,
        borderRadius: "5px",
        maxWidth: "13rem",
        padding: "20px",
      }}
    >
      <b>Test Popover</b>
      <p>
        Lorem ipsum dolor sit amet. Ut corrupti cumque rem illum quia itaque
        quibusdam officiis vero magnam. Ratione?
      </p>
    </div>
  );
};

export default EventPopover;
