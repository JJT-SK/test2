import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  FaStar, 
  FaTrophy, 
  FaMedal, 
  FaAward, 
  FaCertificate 
} from "react-icons/fa";
import { useAchievements } from "@/hooks/use-achievements";
import { useBiohack } from "@/hooks/use-biohack";
import { format, subDays } from "date-fns";

// Sample data for progress charts - in a real app, this would come from the API
const generateProgressData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, 'MMM dd'),
      biohackScore: 50 + Math.floor(Math.random() * 30), // Random score between 50-80
      protocols: Math.floor(Math.random() * 5)
    });
  }
  
  return data;
};

const progressData = generateProgressData();

const Achievements = () => {
  const { userId } = useBiohack();
  const { achievements, isLoading, stats } = useAchievements();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-dark">Achievements & Progress</h1>
        <p className="text-dark-light">Track your biohacking journey and celebrate milestones.</p>
      </div>
      
      {/* User Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center text-white">
                <span className="text-2xl font-bold">JD</span>
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-dark-light mb-2">Biohacker since June 2023</p>
              
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-dark-light">Level 3: Advanced Biohacker (650/1000 XP)</p>
            </div>
            
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center text-white mb-2">
                <FaMedal size={30} />
              </div>
              <p className="text-sm font-medium">Gold Rank</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements Section */}
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-10">
                <p className="text-dark-light">Loading achievements...</p>
              </div>
            ) : achievements.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-dark-light">You haven't earned any achievements yet. Keep going!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={achievement.id} className="bg-white border border-gray-100 rounded-lg p-4 flex items-start">
                    <div className={`
                      flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white mr-3 
                      ${index % 4 === 0 ? 'bg-primary' : 
                        index % 4 === 1 ? 'bg-accent' : 
                        index % 4 === 2 ? 'bg-green-500' : 
                        'bg-amber-500'}
                    `}>
                      {index % 4 === 0 ? <FaTrophy /> : 
                       index % 4 === 1 ? <FaAward /> : 
                       index % 4 === 2 ? <FaStar /> : 
                       <FaCertificate />}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-dark">{achievement.name}</h3>
                      <p className="text-sm text-dark-light mb-1">{achievement.description}</p>
                      <div className="flex items-center">
                        <span className={`
                          inline-block px-2 py-0.5 rounded-full text-xs
                          ${index % 4 === 0 ? 'bg-blue-100 text-primary' : 
                            index % 4 === 1 ? 'bg-purple-100 text-accent' : 
                            index % 4 === 2 ? 'bg-green-100 text-green-600' : 
                            'bg-amber-100 text-amber-600'}
                        `}>
                          +{achievement.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Charts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="biohackScore">
            <TabsList className="mb-4">
              <TabsTrigger value="biohackScore">Biohack Score</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
              <TabsTrigger value="streaks">Streaks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="biohackScore">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="biohackScore" 
                      name="Biohack Score" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 1 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-dark-light mt-3">
                Your Biohack Score has improved by 15% over the last 30 days.
              </p>
            </TabsContent>
            
            <TabsContent value="protocols">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressData.filter((_, i) => i % 3 === 0)} // Show fewer data points for bar chart
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="protocols" 
                      name="Active Protocols" 
                      fill="#8B5CF6"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-dark-light mt-3">
                You've completed 12 protocols in the last 30 days.
              </p>
            </TabsContent>
            
            <TabsContent value="streaks">
              <div className="bg-light rounded-xl p-8 text-center">
                <p className="text-dark-light">
                  Streak tracking visualization coming soon. This will show your consistency over time.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
