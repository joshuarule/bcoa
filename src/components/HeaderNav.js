import React from 'react';
import Link from "gatsby-link";
import { icons } from "./Icons";
import useSiteMetadata from './SiteMetadata';

const Menu = ({ visible, toggleMenu, navHeight }) => {
  const { menuBackground } = useSiteMetadata()
  
  return (
    <nav  
      className={`menu f-navigation ${visible ? 'visible' : ''}`}
      style={{ backgroundImage: `url("${menuBackground.childImageSharp.fixed.src}")`, height: `${navHeight}px` }}
    >
      <ul className="c-white">
        <li>
          <Link to="/#featured" onClick={toggleMenu}>Featured</Link>
        </li>
        <li>
          <Link to="/work" onClick={toggleMenu}>Index</Link>
        </li>
        <li>
          <Link to="/news" onClick={toggleMenu}>News</Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleMenu}>About</Link>
        </li>
        <li>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </li>
      </ul>
    </nav>
  )
};

const headerLogoClick = (visible, toggleMenu) => {
  if (visible) { toggleMenu() };
}

export default ({ visible, toggleMenu, isWindowLarge, navHeight, handleMenuButtonClick }) => {
  const headerLogo = (isWindowLarge === undefined) ? icons.menuLogoLarge : isWindowLarge ? icons.menuLogoLarge : icons.menuLogoSmall
  return (
    <div>
      <header className={visible ? 'c-white bg-transparent' : ''}>
        <div className="container">
          <div className="flex-1">
            <Link className="headerLogo" onClick={ () => headerLogoClick(visible, toggleMenu) } to="/">
              <span className="screen-reader-text">Home</span>
              {headerLogo}
            </Link>
          </div>
          <button title="toggle menue" className={`header-menuButton ${visible ? 'isActive' : ''}`} onClick={toggleMenu} >
            <div className="line lineExterior"></div>
            <div className="line lineInterior lineInterior-1"></div>
            <div className="line lineInterior lineInterior-2"></div>
            <div className="line lineExterior"></div>
          </button>
        </div>
      </header>
      <Menu 
        visible={visible} 
        toggleMenu={toggleMenu} 
        navHeight={navHeight} 
        handleMenuButtonClick={handleMenuButtonClick} 
      />
    </div>
  )
}