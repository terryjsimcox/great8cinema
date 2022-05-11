import { useEffect, useCallback } from 'react';

const useOnScrollY = (handler, ref) => {
  const checkScrollY = useCallback(() => {
    window.scrollY > 150 ? handler(1) : handler(0);
  }, [handler]);
  useEffect(() => {
    window.addEventListener('scroll', checkScrollY);

    return () => window.removeEventListener('scrollY', checkScrollY);
  }, [checkScrollY]);
};

export default useOnScrollY;
