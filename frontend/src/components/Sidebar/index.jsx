import React from "react";
import SidebarLink from "../SidebarLink";

const Sidebar = () => {
  return (
    <aside style={{ padding: "20px" }}>
      <SidebarLink to="/" text="All tests" />
      <SidebarLink to="/create-test" text="Create test" />
    </aside>
  );
};

export default Sidebar;
