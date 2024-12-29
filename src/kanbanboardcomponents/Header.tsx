import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <h1>Kanban Board</h1>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Boards</NavLink>
        <NavLink to="/tags" className={({ isActive }) => isActive ? 'active' : ''}>Manage Tags</NavLink>
      </nav>
    </header>
  );
}

export default Header;
