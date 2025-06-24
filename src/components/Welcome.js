import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const allowed = sessionStorage.getItem("justLoggedIn");

    if (!allowed) {
      navigate("/home");
      return;
    }
  }, [navigate]);

  const clickHandler = () => {
    sessionStorage.removeItem("justLoggedIn");
    navigate("/home");
  };

  return (
    <div className="h-full absolute w-screen top-0 left-0 z-50 flex flex-col items-center justify-center dark:bg-dark bg-light animate-fade-in text-white overflow-hidden">
      <div className="flex flex-col items-center sm:justify-center gap-3 sm:gap-4 z-10 sm:bg-white/20 sm:dark:bg-black/40 sm:backdrop-blur-lg sm:rounded-2xl sm:border border-white/10 sm:overflow-hidden sm:h-80 sm:w-1/4">
        <h1 className="text-4xl sm:text-5xl font-bold animate-fade-in-delay text-white text-shadow2 dark:text-cyan-300">
          Welcome!
        </h1>
        <p className="text-base sm:text-lg animate-fade-in-delay2 dark:text-gray-300 text-black text-glow">
          Let the music flow 🎵
        </p>
        <button
          className="bg-white px-8 py-2 sm:w-60 dark:text-white hover:shadow-inner hover:shadow-black dark:hover:bg-white dark:hover:text-purple-500 dark:bg-purple-500 text-black rounded-3xl hover:bg-transparent  hover:text-white transition-all duration-300 text-lg font-bold active:scale-[0.94]"
          onClick={() => clickHandler()}
        >
          Continue..
        </button>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 dark:text-neonBlue text-white animate-slide-up"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-2v13"
          />
        </svg>
      </div>
    </div>
  );
};

export default Welcome;
