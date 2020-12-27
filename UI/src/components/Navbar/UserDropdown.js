import React, { useState } from 'react';
import { User } from './MenuItems.js';
import './UserDropdown.css';
import { Link } from 'react-router-dom';

function UserDropdown() {  
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {User.map((item, index) => {
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

export default UserDropdown;