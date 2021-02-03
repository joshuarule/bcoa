import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Headroom from "react-headroom";
import classnames from "classnames";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import FixedLogo from "../components/FixedLogo";
import "../styles/app.scss";
import { useCurrentBreakpoint } from "../hooks/useCurrentBreakpoint";
import { useInView } from "react-intersection-observer";

const TemplateWrapper = ({ path, render }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const breakpoint = useCurrentBreakpoint();
  const { ref, inView } = useInView({ rootMargin: "-49%" });

  const homeClasses = classnames({
    blackFixedLogo:
      path.replace(/\//g, "") === "work" && breakpoint === "large",
    menuVisible: isMenuOpen,
    "bg-lightRed c-red":
      path.replace(/\//g, "") === "about" ||
      path.replace(/\//g, "") === "contact",
    hideFixedLogo:
      path.replace(/\//g, "") === "news" ||
      (path.replace(/\//g, "") === "work" && breakpoint === "medium") ||
      (path.replace(/\//g, "") === "contact" && breakpoint === "medium") ||
      (path.replace(/\//g, "") === "" && breakpoint === "small"),
  });

  return (
    <div className={homeClasses}>
      <Helmet bodyAttributes={{ class: isMenuOpen && "scrollingIsDisabled" }} />
      <Headroom>
        <HeaderNav
          visible={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          isWindowLarge={breakpoint === "large"}
          // navHeight=      { this.state.navHeight }
        />
      </Headroom>
      <FixedLogo isDark={!inView} isWindowMedium={breakpoint === "medium"} />
      <div className="main">{render(ref, breakpoint)}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
