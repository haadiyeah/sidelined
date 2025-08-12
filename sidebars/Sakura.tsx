import {
  AcademicCapIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  CommandLineIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { SidebarItem } from "./SidebarItem";

const sidebarItems = [
  { icon: <ChartBarIcon />, text: "Dashboard", url: "/dashboard" },
  { icon: <BookOpenIcon />, text: "Courses", url: "/courses" },
  { icon: <CommandLineIcon />, text: "Code Editor", url: "/code" },
  { icon: <CogIcon />, text: "Settings", url: "/settings" },
];

interface SidebarProps {
  children: React.ReactNode;
}


/**
|--------------------------------------------------
| Usage:
| <Sidebar> 
|   <YourPageContent />
| </Sidebar>
| Ideal for educational platforms.
|--------------------------------------------------
*/


const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  const closeDrawer = () => {
    if (isExpanded) {
      toggleDrawer();
    }
  };

  return (
    <div className="min-h-[100vh] bg-base-100">
      {/* Sidebar for screens medium and above */}
      <div className="flex h-full max-sm:hidden">
        {/* Overlay */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-35 z-20"
            onClick={closeDrawer}
          ></div>
        )}
        <div
          className={`${
            isExpanded ? "w-64" : "w-20"
          } h-screen bg-neutral transition-width duration-300 overflow-hidden fixed top-0 z-30`}
        >
          <nav className="h-full">
            <ul
              className={`menu h-full ${
                isExpanded ? "w-64" : "w-20"
              } bg-base-200 text-base-content min-h-full w-60 p-4 flex flex-col justify-between`}
            >
              <div>
                <SidebarItem
                  icon={<AcademicCapIcon />}
                  text={"CodeQuest"}
                  url="/"
                />
                <li className="sidebar-item w-10" onClick={toggleDrawer}>
                  <a className="flex items-center">
                    <button className="p-0 ">
                      {isExpanded ? (
                        <ChevronLeftIcon className="h-6 w-6" />
                      ) : (
                        <ChevronRightIcon className="h-6 w-6" />
                      )}
                    </button>
                  </a>
                </li>
              </div>

              <div>
                {sidebarItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    url={item.url}
                  />
                ))}
              </div>
              <div>
                <SidebarItem
                  icon={<UserCircleIcon />}
                  text={"Profile"}
                  url="/profile"
                />
                <SidebarItem
                  icon={<ArrowLeftStartOnRectangleIcon />}
                  text={"Logout"}
                  url="/logout"
                />
              </div>
            </ul>
          </nav>
        </div>
        <div className="flex-grow p-16 pt-0 ml-20 overflow-auto">
          {children /* this is where the page content will be rendered. */}
        </div>
      </div>

      {/* Navbar with drawer for small screens*/}
      <div className="drawer sm:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar with drawer for smalls screens */}
          <div className="navbar bg-base-100 drop-shadow-md mb-2">
            <div className="flex-1">
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost drawer-button "
              >
                <Bars3Icon className="h-6 w-6" />
              </label>
            </div>
            <div className="flex-none">
              <button className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {/* Page content here */}
          <div className="p-8">{children}</div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
            <div>
              <SidebarItem
                icon={<AcademicCapIcon />}
                text={"CodeQuest"}
                url="/welcome"
              />
            </div>

            <div>
              {sidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  url={item.url}
                />
              ))}
            </div>
            <div>
              <SidebarItem
                icon={<UserCircleIcon />}
                text={"Profile"}
                url="profile"
              />
              <SidebarItem
                icon={<ArrowLeftStartOnRectangleIcon />}
                text={"Logout"}
                url="profile"
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;