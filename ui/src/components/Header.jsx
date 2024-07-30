import React from 'react';
import './Header.css';

export default function Header({ title, rightContent }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        {rightContent}
      </div>
    </header>
  );
}
