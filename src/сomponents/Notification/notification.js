import React from "react";
import "./notification.css";

const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
