import { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    const handleScreenResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return width;
};

export default useScreenWidth;
