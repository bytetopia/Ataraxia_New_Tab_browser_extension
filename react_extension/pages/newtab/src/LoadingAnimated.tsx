import React, { useState, useEffect } from 'react';



const LoadingAnimated: React.FC = () => {
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length === 3) return '.';
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <span className="text-md font-small text-gray-500">loading{dots}</span>
    </div>
  );
};

export default LoadingAnimated;