import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Headroom from "react-headroom";
import classnames from "classnames";
import Footer from '../components/Footer'
import HeaderNav from '../components/HeaderNav'
import FixedLogo from '../components/FixedLogo'
import "../styles/app.scss";
import {useCurrentBreakpoint} from '../hooks/useCurrentBreakpoint';
import useIntersection from '../hooks/useIntersection';

const TemplateWrapper = ({children, path}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const breakpoint = useCurrentBreakpoint();

  // set up intersection observer for vertical logo
  const [ref, entry] = useIntersection({rootMargin: '-49%'});
  // pass intersection ref down to children
  const childrenWithProps = React.Children.map(children, (child, i) =>
    React.cloneElement(child, { intersectionReference: ref, breakpoint })
  );

  const homeClasses = classnames({
    'blackFixedLogo': path.replace(/\//g, '') === 'work' && breakpoint === 'large',
    'menuVisible': isMenuOpen,
    'bg-lightRed c-red': ( path.replace(/\//g, '') === 'about'
                        || path.replace(/\//g, '') === 'contact' ),
    'hideFixedLogo': path.replace(/\//g, '') === 'news'
                || ( path.replace(/\//g, '') === 'work' && breakpoint === 'large' )
                || ( path.replace(/\//g, '') === 'contact' && breakpoint === 'medium' )
                || ( path.replace(/\//g, '') === '' && breakpoint === 'small' ),
  })

  // Helmet

  return (
    <div className={homeClasses}>
      <Helmet
        bodyAttributes={{ class: isMenuOpen && 'scrollingIsDisabled' }}
      />
      <Headroom>
        <HeaderNav  
          visible=        { isMenuOpen }
          toggleMenu=     { () => setIsMenuOpen(!isMenuOpen) }
          isWindowLarge=  { breakpoint === "large" }
          // navHeight=      { this.state.navHeight }
        />
      </Headroom>
      <FixedLogo isDark={ !entry.isIntersecting } isWindowMedium={ breakpoint === "medium" } />
      <div>
        {childrenWithProps}
      </div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
