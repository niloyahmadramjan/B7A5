export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center  backdrop-blur-md">
      {/* Main Loading Container */}
      <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl  border border-slate-800 shadow-2xl shadow-blue-500/10">
        
        {/* Animated Rings & Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer Glowing Ring */}
          <div className="absolute w-16 h-16 rounded-full border-4 border-blue-500/20 animate-ping"></div>
          
          {/* Spinning Gradient Border */}
          <div className="w-14 h-14 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 animate-spin"></div>
          
          {/* Inner Pulsing Dot */}
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
        </div>

        {/* Loading Text & Description */}
        <div className="text-center space-y-1.5">
          <h3 className="text-white font-semibold text-base tracking-wide flex items-center justify-center gap-1.5">
            Loading<span className="animate-bounce">.</span><span className="animate-bounce delay-150">.</span><span className="animate-bounce delay-300">.</span>
          </h3>
          <p className="text-xs text-gray-400">Please wait while we fetch your data</p>
        </div>

        {/* Bottom Progress Bar Simulation */}
        <div className="w-36 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-full h-full bg-linear-to-r from-blue-500 via-indigo-500 to-blue-600 animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}