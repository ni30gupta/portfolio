import { useEffect } from 'react';

function useEscape(callback) {
  
    useEffect(() => {
    
        const handleEscape = (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleEscape);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
    
  }, [callback]);

}

export default useEscape;
