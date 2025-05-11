import BiohackScore from "@/components/dashboard/biohack-score";
import DataAnalyticsCard from "@/components/dashboard/data-analytics-card";
import AchievementsCard from "@/components/dashboard/achievements-card";
import ForumDashboardCard from "@/components/dashboard/forum-dashboard-card";
import CurrentProtocolsCard from "@/components/dashboard/current-protocols-card";
import DailyTipsCard from "@/components/dashboard/daily-tips-card";
import { useBiohack } from "@/hooks/use-biohack";

const Home = () => {
  const { isLoading } = useBiohack();
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-dark">Dashboard Overview</h1>
        <p className="text-dark-light">Welcome back, John. Here's your biohacking progress.</p>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <DataAnalyticsCard />
          <AchievementsCard />
        </div>
        
        {/* Center Column - Biohack Score */}
        <div className="space-y-6 central-score">
          <BiohackScore />
          <DailyTipsCard />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <ForumDashboardCard />
          <CurrentProtocolsCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
