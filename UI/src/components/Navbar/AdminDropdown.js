import React, { useState } from 'react';
import { Admin } from './MenuItems.js';
import './AdminDropdown.css';
import { Link } from 'react-router-dom';

function AdminDropdown() {  
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {Admin.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AdminDropdown;