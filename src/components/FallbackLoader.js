const FallbackLoader = ({className}) => {
  return (
   <div className={`flex items-center justify-center w-full h-full`}>
      <div className={`relative ${className? className:"size-16"}`}>
        <div className="absolute inset-0 rounded-full border-t-[4px] border-white/80 animate-spin"></div>
      </div>
    </div>
  );
};

export default FallbackLoader;
