import { useEffect, useRef } from 'react';
let useClickOutside = (domNode, handler) => {
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
      maybeHandler = false;
    };
  });

  return domNode;
};

export default useClickOutside;
