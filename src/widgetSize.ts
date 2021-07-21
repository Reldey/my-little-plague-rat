import { useEffect, useState } from 'react';
import { theme } from './theme';

export interface IWindowSize {
  width?: number;
  height?: number;
  mobile?: boolean;
}

export function useWidgetSize(widgetDivRef: React.MutableRefObject<HTMLDivElement>): IWindowSize {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [widgetSize, setWidgetSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      if (widgetDivRef?.current) {
        setWidgetSize({
          width: widgetDivRef.current.getBoundingClientRect().width,
          height: window.innerHeight,
          mobile: widgetDivRef.current.getBoundingClientRect().width <= theme.mobileCutOff,
        });
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return widgetSize;
}
