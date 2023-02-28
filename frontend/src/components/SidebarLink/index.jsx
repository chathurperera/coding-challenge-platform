import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarLink.module.scss";

const SidebarLink = ({ to, text }) => {
  let activeStyle = {
    backgroundColor: "#f2f1f1ec",
  };
  return (
    <div className={styles.sidebarLink}>
      <NavLink
        to={to}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {text}
      </NavLink>
    </div>
  );
};

export default SidebarLink;
