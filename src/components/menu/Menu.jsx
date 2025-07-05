import React from 'react';
import './Menu.css';

const Menu = ({ menuItems }) => {
  return (
    <div className="dnmenu-container">
      {menuItems.map((item) => (
        <div
          key={item.name}
          onClick={item.click}
          className={`dnmenu-item ${item.active ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Menu;
