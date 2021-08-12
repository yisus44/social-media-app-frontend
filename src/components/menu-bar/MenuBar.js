import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const path = pathname === '/' ? 'feed' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="brown">
      <Menu.Item
        name={user.username}
        active={activeItem === user.username}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="most_viewed"
        active={activeItem === 'most_viewed'}
        onClick={handleItemClick}
        as={Link}
        to="/popular"
      />
      <Menu.Menu position="right">
        <Menu.Item name="Social media app" onClick={handleItemClick} />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="brown">
      <Menu.Item
        name="feed"
        active={activeItem === 'feed'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="most viewed"
        active={activeItem === 'most viewed'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item name="Social media app" onClick={handleItemClick} />
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
}
