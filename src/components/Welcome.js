import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgLight from "../images/bg.webp";
import bgDark from "../images/bgDark.webp";

const Welcome = () => {
  const navigate = useNavigate();
  const themeMode = useSelector((store) => store.theme.mode);
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const allowed = sessionStorage.getItem("justLoggedIn");

    if (!allowed) {
      navigate("/home");
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sessionStorage.removeItem("justLoggedIn");
          navigate("/home");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleContinue = () => {
    sessionStorage.removeItem("justLoggedIn");
    navigate("/home");
  };

  return (
    <div
      className={`h-full absolute w-[100dvw] top-0 left-0 z-50 flex flex-col items-center justify-center text-white overflow-hidden`}
      style={{
        backgroundImage: `url(${themeMode === "dark" ? bgDark : bgLight})`,
      }}
    >
      <div className="flex flex-col items-center justify-center gap-3 z-10 bg-white/20 dark:bg-black/40 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/10 overflow-hidden h-60 md:h-80 w-2/4 xl:w-1/3 animate-fade-in">
        <h1 className="text-3xl xl:text-4xl font-bold text-white text-shadow2 dark:text-cyan-300">
          Welcome!
        </h1>
        <p className="text-base md:text-lg dark:text-gray-300 text-black text-glow">
          Let the music flow 🎵
        </p>
        <p className="text-sm font-semibold text-gray-100 dark:text-gray-300">
          Redirecting in {secondsLeft} second{secondsLeft !== 1 && "s"}...
        </p>
        <button
          className="bg-white w-[80%] text-sm py-2 sm:w-60 dark:text-white hover:shadow-inner hover:shadow-black dark:hover:bg-white dark:hover:text-purple-500 dark:bg-purple-500 text-black rounded-3xl hover:bg-transparent hover:text-white transition-all duration-200 lg:text-lg font-semibold active:scale-[0.94]"
          onClick={() => handleContinue()}
        >
          Continue..
        </button>
      </div>
    </div>
  );
};

export default Welcome;
