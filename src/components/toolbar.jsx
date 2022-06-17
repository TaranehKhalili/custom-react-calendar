import {
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import "./style.css";

const CalendarToolbar = (props) => {
  const [showViewOptions, setShowViewOptions] = useState(false);

  const navigate = (action) => {
    props.onNavigate(action);
  };

  const changeView = (view) => {
    props.onView(view);
    props.onChangeView(view);
  };

  document.addEventListener("mouseup", function (e) {
    var container = document.getElementById("calendar-toolbar");
    if (container && container.contains(e.target)) {
      props.onSelectToolbar();
    }
  });

  return (
    <div id="calendar-toolbar" className="calendar-toolbar-container">
      <div>
        <div className="">
          <Button
            className="calendar-toolbar-btn "
            onClick={() => navigate("TODAY")}
          >
            Today
          </Button>
          <FaAngleLeft
            style={{
              marginLeft: "3rem",
              marginRight: "2rem",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("PREV")}
          />
          <FaAngleRight
            onClick={() => navigate("NEXT")}
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          />
        </div>
      </div>

      <div>
        <b style={{ fontSize: "1.8rem" }}>{props.label}</b>
      </div>
      <div>
        <ButtonDropdown
          isOpen={showViewOptions}
          toggle={() => {
            setShowViewOptions(!showViewOptions);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownToggle className="calendar-toolbar-btn " caret>
            {props.view}
          </DropdownToggle>
          <DropdownMenu className="">
            {props.views.map((view) => (
              <DropdownItem key={view} onClick={() => changeView(view)}>
                {view}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    </div>
  );
};

export default CalendarToolbar;
