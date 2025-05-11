import { useBiohack } from "@/hooks/use-biohack";
import { FaArrowUp } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const BiohackScore = () => {
  const { 
    biohackScore, 
    lastCheckIn, 
    currentStreak, 
    activeProtocols,
    checkIn,
    isCheckingIn
  } = useBiohack();

  const handleCheckIn = () => {
    // For demonstration, check in with random biometric values
    checkIn({
      sleepQuality: Math.floor(70 + Math.random() * 20),
      energyLevel: Math.floor(60 + Math.random() * 30),
      stressLevel: Math.floor(20 + Math.random() * 40),
      focusLevel: Math.floor(65 + Math.random() * 25),
      moodLevel: Math.floor(65 + Math.random() * 25),
    });
  };

  // Format the last check-in time
  const formattedLastCheckIn = lastCheckIn 
    ? formatDistanceToNow(new Date(lastCheckIn), { addSuffix: true })
    : "Never";

  // Next goal calculation (simple example - aim for 5-10 points higher)
  const nextGoal = biohackScore ? Math.min(100, Math.ceil(biohackScore / 5) * 5 + 5) : 60;

  return (
    <div className="dashboard-card bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold text-dark mb-6">Biohack Score</h2>
      
      <div className="relative mb-8">
        <div className="w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg animate-pulse-slow">
          <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center">
            <div className="text-center">
              <span className="block text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">{biohackScore}</span>
              <span className="text-dark-light text-sm">out of 100</span>
            </div>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="absolute top-0 right-0 bg-green-100 rounded-full h-8 w-8 border-4 border-white shadow-sm flex items-center justify-center">
          <FaArrowUp className="text-xs text-green-600" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -left-2 bg-blue-100 rounded-full h-6 w-6 border-2 border-white"></div>
        <div className="absolute top-1/2 -right-3 bg-purple-100 rounded-full h-4 w-4 border-2 border-white"></div>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-dark-light mb-1">Last check-in: {formattedLastCheckIn}</p>
        <button 
          className="mt-3 bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-70"
          onClick={handleCheckIn}
          disabled={isCheckingIn}
        >
          {isCheckingIn ? 'Checking in...' : 'Check-in Now'}
        </button>
      </div>
      
      <div className="w-full grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-dark-light mb-1">Current Streak</p>
          <p className="font-semibold text-dark">{currentStreak} days</p>
        </div>
        <div>
          <p className="text-xs text-dark-light mb-1">Protocols</p>
          <p className="font-semibold text-dark">{activeProtocols} active</p>
        </div>
        <div>
          <p className="text-xs text-dark-light mb-1">Next Goal</p>
          <p className="font-semibold text-dark">{nextGoal} points</p>
        </div>
      </div>
    </div>
  );
};

export default BiohackScore;
