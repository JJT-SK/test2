import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Lightbulb } from "lucide-react";
import { useState } from "react";

// Tips that could be fetched from an API
const TIPS = [
  {
    title: "Optimize Your Morning",
    content: "Try 5 minutes of cold exposure followed by a 10-minute meditation to boost your cognitive performance and stress resilience."
  },
  {
    title: "Enhance Focus",
    content: "Try the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break. Repeat 4 times, then take a longer break."
  },
  {
    title: "Sleep Optimization",
    content: "Avoid blue light 2 hours before bed and keep your bedroom temperature between 65-68°F (18-20°C) for optimal sleep quality."
  },
  {
    title: "Nutrition Hack",
    content: "Consider eating your meals within an 8-10 hour window to give your digestive system time to rest and optimize metabolic health."
  }
];

const DailyTipsCard = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const refreshTip = () => {
    const nextIndex = (currentTipIndex + 1) % TIPS.length;
    setCurrentTipIndex(nextIndex);
  };
  
  const currentTip = TIPS[currentTipIndex];

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-dark">Daily Tips</CardTitle>
          <button 
            className="text-primary hover:text-blue-600"
            onClick={refreshTip}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start mb-2">
            <div className="flex-shrink-0 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Lightbulb size={16} />
            </div>
            <h3 className="ml-3 text-base font-medium text-dark">{currentTip.title}</h3>
          </div>
          <p className="text-sm text-dark-medium">{currentTip.content}</p>
          <div className="mt-3 flex justify-end">
            <button className="text-primary hover:text-blue-700 text-sm font-medium">Try This</button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTipsCard;
