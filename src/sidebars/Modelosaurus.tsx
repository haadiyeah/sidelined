import React, { useState, useEffect } from 'react';

import build from '../assets/modelosaurus-icons/build.png';
import chip from '../assets/modelosaurus-icons/chip.png';
import cloud from '../assets/modelosaurus-icons/cloud.png';
import dashboard from '../assets/modelosaurus-icons/dashboard.png';
import learn from '../assets/modelosaurus-icons/learn.png';
import robot from '../assets/modelosaurus-icons/robot.png';
import setting from '../assets/modelosaurus-icons/setting.png';
import model from '../assets/modelosaurus-icons/model.png';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
|--------------------------------------------------
| A modern, techy sidebar with image icons.
| Usage:
| <Sidebar>
|   <YourPageContent />
| </Sidebar>
| Ideal for tech platforms and applications.

COLOR PALLETTE USED IN THIS PROJ:

daisyui: {
    themes: [
      {
        modelosaurus: {
          'primary':'#683895',
          'secondary': '#07ABBD',
          'accent': '#393D5E',
          'neutral': '#002D68',
          'base-100': '#1D203E',
          'info': '#7976E8',
          'success': '#55924C',
          'warning': '#B3A443',
          'error': '#8A302A',
          'fontFamily': 'Montserrat, sans-serif',
        }
      }
    ]
  }
|--------------------------------------------------
*/


import { createContext, useContext } from 'react';

// Create the context
const IndicatorPositionContext = createContext();

// Create a provider component
export const IndicatorPositionProvider = ({ children }) => {
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  return (
    <IndicatorPositionContext.Provider value={{ indicatorPosition, setIndicatorPosition }}>
      {children}
    </IndicatorPositionContext.Provider>
  );
};

// Custom hook to use the IndicatorPositionContext
export const useIndicatorPosition = () => {
  return useContext(IndicatorPositionContext);
};

const sidebarItems = [
  { id: 1, name: 'Dashboard', icon: dashboard, url: '/dashboard' },
  { id: 2, name: 'Fine Tuning', icon: build, url: '/finetune' },
  { id: 3, name: 'Datasets', icon: learn, url: '/upload-dataset' },
  { id: 4, name: 'Finetuned Models', icon: model, url: '/models' },
  { id: 5, name: 'Custom Models', icon: robot, url: '/custom-models' },
  //{ id: 6, name: 'Analyzer', icon: cloud, url: '/analyze-architecture' },
  { id: 7, name: 'Visualization', icon: chip, url: '/visualize-layers' },
  { id: 8, name: 'Settings', icon: setting, url: '/settings' },
  // {id: 9, name: 'Logout', icon: LogOut, url: '/logout'}
];

const Sidebar = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState();
  const { indicatorPosition, setIndicatorPosition } = useIndicatorPosition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const index = sidebarItems.findIndex((item) => item.id === selectedItem);
    setIndicatorPosition(index * 72 + 57);

    //check the url to see if it is already corresponding to any of the sidebar item, in that case set the selected item
    const currentUrl = window.location.pathname;
    const item = sidebarItems.find((item) => currentUrl.toLowerCase().includes(item.url.toLowerCase()));
    if (item) {
      setSelectedItem(item.id);
    }
  }, [selectedItem]);

  return (
    <div className="relative flex min-h-[100vh] overflow-hidden">
      {/** Overlay that comes on the content  */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/** Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-64' : 'w-20'
          } bg-gray-900 h-screen flex flex-col items-center py-4 rounded-xl flex-shrink-0 relative z-30 transition-all duration-300`}
      >

        {/** Sidebar Toggle Button */}
        <div className="flex items-start w-full ml-10">
          <button
            className="mb-6 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 bg-gray-700 hover:bg-gray-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="w-6 h-6 bg-primary/60 p-4 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">{isSidebarOpen ?
                <ChevronLeftIcon size={24} /> : <ChevronRightIcon size={24} />
              }</span>
            </div>
          </button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-r-lg"></div>
        {/** Indicator Line on the side */}
        <div
          className="absolute left-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full transition-transform duration-300"
          style={{ transform: `translateY(${isSidebarOpen ? indicatorPosition : indicatorPosition + 15}px)` }}
        ></div>

        {config.navigation.items.map((item) => {
          const itemIsActive = isActive(item) || selectedItem === item.id;
          
          return (
            <div 
              key={item.id} 
              className="flex items-center gap-3 mb-6 w-full ml-7 cursor-pointer" 
              onClick={() => {
                navigate(item);
                setSelectedItem(item.id);
              }}
            >
              <button
                className={`rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                  (itemIsActive && !isSidebarOpen)
                  ? 'size-20 ml-2 bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg shadow-purple-500/50'
                  : 'size-12 bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div
                  className={`${
                    (itemIsActive && !isSidebarOpen) ? 'size-[4.8rem]' : 'size-[2.8rem]'
                    } bg-gray-800 rounded-full flex items-center justify-center`}
                >
                  <div className={`${
                    (itemIsActive && !isSidebarOpen) ? 'size-[4.6rem]' : 'size-[2.8rem]'
                  }`}>
                    {item.icon}
                  </div>
                </div>
              </button>
              {isSidebarOpen && (
                <span 
                  className={`text-white cursor-pointer text-sm mt-2 ${
                    (itemIsActive && isSidebarOpen) 
                    ? "font-bold py-1 px-3 rounded-lg bg-gradient-to-tl from-blue-400 to-purple-500 bg-opacity-60 text-white" 
                    : ""
                  }`}
                >
                  {item.name}
                </span>
              )}
            </div>
          );
        })}


        {/* <button className="w-12 h-12 mt-auto rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center relative z-10">
          <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">+</span>
          </div>
        </button> */}
      </div>


      {/** Content (children) */}
      <div
        className={`relative flex-grow overflow-y-scroll overflow-x-hidden h-screen p-10 lg:px-28 sm:px-16  transition-all duration-300 ${isSidebarOpen ? 'pointer-events-none' : ''
          }`}
      >
        {/** Background Blobs */}
        {/* <div className="blob opacity-25" style={{ bottom: '-6%', right: '0%' }}></div>
        <div className="blob opacity-25" style={{ bottom: '10%', right: '-5%' }}></div>
        <div className="blob opacity-25" style={{ bottom: '10%', right: '20%' }}></div>
        <div className="blob opacity-10" style={{ bottom: '90%', right: '80%' }}></div>
        <div className="blob opacity-10" style={{ bottom: '80%', right: '85%' }}></div> */}
        {children}
      </div>
    </div>
  );
};

export default Sidebar;