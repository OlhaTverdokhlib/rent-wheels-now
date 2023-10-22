import React from 'react';
import logo from '../../images/logoWeels.png';
import headerStyle from './Header.module.scss';

import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={headerStyle.block}>
      <div className={headerStyle.block__container}>
        <div className={headerStyle.block__logo}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className={headerStyle.block__logo__img}
            />
          </Link>
        
          <p className={headerStyle.block__logo__title}>Rent Wheels Now</p>
        </div>

        <div className={ headerStyle.block__nav}>
          <NavLink  to="/catalog" className={headerStyle.block__nav__link}>Catalog</NavLink>
          <NavLink to="/favorites" className={headerStyle.block__nav__link}>Favorites</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
