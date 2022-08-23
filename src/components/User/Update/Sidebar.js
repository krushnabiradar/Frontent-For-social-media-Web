import React from "react";
import { Link } from "react-router-dom";

const tabs = [
  {
    title: "Edit Profile",
    nav: "/accounts/edit",
  },
  {
    title: "Change Password",
    nav: "/accounts/password/change",
  },
  {
    title: "Apps and Websites",
    nav: "/accounts/edit",
  },
];

const Sidebar = ({ activeTab }) => {
  return (
    <div className="hidden sm:flex flex-col border-r w-1/4">
      {tabs.map((el, i) => (
        <Link
          to={el.nav}
          className={`${
            activeTab === i
              ? "border-black text-black border-l-2 font-medium"
              : "hover:border-gray-300 text-gray-600"
          } py-3 px-6 hover:border-l-2 hover:bg-gray-50 cursor-pointer`}
        >
          {el.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
