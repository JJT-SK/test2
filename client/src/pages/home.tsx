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
      
      {/* Dashboard Grid - Center element with 4 surrounding sections */}
      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* Top Row */}
        <div className="md:col-span-1">
          <DataAnalyticsCard />
        </div>
        <div className="md:col-span-1">
          <ForumDashboardCard />
        </div>
        
        {/* Center element - spans across middle */}
        <div className="md:col-span-2 flex justify-center items-center my-4">
          <div className="w-full max-w-md">
            <BiohackScore />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="md:col-span-1">
          <AchievementsCard />
        </div>
        <div className="md:col-span-1">
          <CurrentProtocolsCard />
        </div>
        
        {/* Daily Tips - below everything */}
        <div className="md:col-span-2 mt-6">
          <DailyTipsCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
