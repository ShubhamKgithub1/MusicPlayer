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
    <div className="h-full absolute w-screen top-0 left-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#134e5e] to-[#71b280] animate-fade-in text-white overflow-hidden">
      <div className="text-center flex flex-col gap-4 z-10">
        <h1 className="text-5xl font-bold animate-fade-in-delay">Welcome!</h1>
        <p className="text-lg font-light animate-fade-in-delay2">
          Let the music flow 🎵
        </p>
        <button
          className="bg-white px-6 py-2 text-black rounded-3xl hover:bg-transparent border  border-white/20 hover:text-white transition-all duration-300 shadow-sm text-lg font-semibold"
          onClick={() => clickHandler()}
        >
          Continue..
        </button>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-white animate-slide-up"
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
