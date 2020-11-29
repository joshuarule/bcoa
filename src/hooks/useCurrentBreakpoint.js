import { useState, useEffect } from 'react';

const getWidth = () => {
  if(typeof window === `undefined`) return false;
  return window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;
}

const getBreakpoint = (width = getWidth()) => {
  return width >= 1024 ? 'large' : width >= 768 ? 'medium' : 'small';
}

export const useCurrentBreakpoint = () => {
  // save current window width in the state object

  let [breakpoint, setBreakpoint] = useState(getBreakpoint());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setBreakpoint(getBreakpoint()), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return breakpoint;
}
