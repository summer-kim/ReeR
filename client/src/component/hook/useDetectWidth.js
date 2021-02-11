import { useState, useEffect } from 'react';

export const useDetectWidth = () => {
  const [InnerWidth, setInnerWidth] = useState(window.innerWidth);
  const excute = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', excute);
    return () => {
      window.removeEventListener('resize', excute);
    };
  }, []);

  return InnerWidth;
};
