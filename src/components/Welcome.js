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
    // setTimeout(() => {
    //   sessionStorage.removeItem("justLoggedIn");
    //   navigate("/home");
    // }, 2000);
  }, [navigate]);

  const clickHandler =()=>{
     sessionStorage.removeItem("justLoggedIn");
      navigate("/home");
  };

  return (
    <div className="h-full absolute w-screen top-0 left-0 z-50 flex flex-col items-center justify-center dark:bg-gradient-to-r from-[#1e1e1e] to-[#1e1e1e] bg-forest animate-fade-in text-white overflow-hidden">
      <div className="text-center flex flex-col gap-3 sm:gap-4 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold animate-fade-in-delay dark:text-neonBlue">Welcome!</h1>
        <p className="text-base sm:text-lg font-light animate-fade-in-delay2 dark:text-textMuted">
          Let the music flow 🎵
        </p>
        <button
          className="bg-white sm:px-6 py-2 dark:text-white dark:hover:bg-transparent dark:border dark:border-black/20 dark:bg-black/40 dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-black rounded-3xl hover:bg-transparent shadow-custom hover:text-white transition-all duration-300 text-lg font-semibold active:scale-[0.94]"
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
