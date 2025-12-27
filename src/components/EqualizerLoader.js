const EqualizerLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full px-4 lg:px-0">
      <div className="flex items-end justify-center gap-[6px] h-16 lg:gap-2 lg:h-20 animate-fade-in">
        <div className="w-[3px] lg:w-1 h-4 lg:h-5 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
        <div className="w-[3px] lg:w-1 h-6 lg:h-7 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
        <div className="w-[3px] lg:w-1 h-8 lg:h-9 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
        <div className="w-[3px] lg:w-1 h-6 lg:h-7 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
        <div className="w-[3px] lg:w-1 h-4 lg:h-5 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
      </div>
    </div>
  );
};

export default EqualizerLoader;
