import { useEffect } from 'react';

const useOnScrollY = (handler) => {
  const checkScrollY = () => {
    window.scrollY > 150 ? handler(1) : handler(0);
  };
  useEffect(() => {
    window.addEventListener('scroll', checkScrollY);

    return () => window.removeEventListener('scrollY', checkScrollY);
  }, []);
};

export default useOnScrollY;
