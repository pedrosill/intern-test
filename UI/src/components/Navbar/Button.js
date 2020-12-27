import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <Link to='signin'>
      <button className='btn'>Sign in</button>
    </Link>
  );
}