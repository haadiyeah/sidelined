import React from 'react';

interface SidebarItemProps {
  icon: React.ReactElement;
  text: string;
  url: string;
  setSelectedItem?: (item: string) => void;
  selectedItem?: string;
  isExpanded?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  url,
  setSelectedItem,
  selectedItem,
  isExpanded = true
}) => {
  const handleClick = () => {
    if (setSelectedItem) {
      setSelectedItem(text);
    }
    // Simple navigation
    window.location.href = url;
  };

  const isActive = selectedItem === text;
  
  return (
    <li 
      className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${isActive ? 'bg-blue-100' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5">
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        {isExpanded && (
          <span className="text-sm font-medium">
            {text}
          </span>
        )}
      </div>
    </li>
  );
};