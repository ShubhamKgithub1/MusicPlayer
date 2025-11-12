import { useEffect, useState } from "react";

const useIsSmallDevice = () => {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize",handleResize);
  }, []);
  return isSmall;
};

export default useIsSmallDevice;