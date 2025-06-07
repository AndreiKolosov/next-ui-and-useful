import { useState, useLayoutEffect } from 'react';

export const useMatchMedia = (widths: number[]) => {
  const queries = widths.map(width => `(max-width: ${width}px)`);
  
  const mediaQueryLists = typeof window !== 'undefined' 
    ? queries.map(query => matchMedia(query))
    : new Array(widths.length).fill({matches: false});
  
  const getValues = () => mediaQueryLists.map(list => list.matches);

  const [values, setValues] = useState(getValues);
  
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => setValues(getValues);
    mediaQueryLists.forEach(list => list.addEventListener('change', handler));

    return () => {
      mediaQueryLists.forEach(list => 
        list.removeEventListener('change', handler)
      );
    };
  }, []);

  return widths.reduce<boolean []>((acc, width, index) => {
    acc.push(values[index])
    return acc
  }, []);
};
