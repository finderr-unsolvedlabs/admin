import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 100,
    height: 100,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setIsMobile(window.innerWidth <= 768); // 768px is a common standard value for mobile devices
    };

    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSize, isMobile };
};

export { useScreenSize };
