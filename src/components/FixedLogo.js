import React from 'react';
import { icons } from "./Icons";

export default ({ isDark }) => {
  return (
    <div className={`fixedLogo container ${isDark ? 'c-black' : 'c-white'}`}>
      {icons.fixedLogo}
    </div>
  )
}
