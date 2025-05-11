import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaAward, FaStar } from "react-icons/fa";
import { useAchievements } from "@/hooks/use-achievements";
import { formatDistanceToNow } from "date-fns";
import { useBiohack } from "@/hooks/use-biohack";

const COLORS = ['#8B5CF6', '#3B82F6', '#E5E7EB'];

const AchievementsCard = () => {
  const { userId } = useBiohack();
  const { achievements, isLoading } = useAchievements();

  // Fake data for the doughnut chart - in a real app, this would come from API
  const chartData = [
    { name: 'Completed', value: 65 },
    { name: 'In Progress', value: 25 },
    { name: 'Not Started', value: 10 }
  ];

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-dark">Achievements</CardTitle>
          <a href="/achievements" className="text-sm text-primary hover:underline">View All</a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-center text-dark-light">Loading achievements...</p>
            ) : (
              <>
                {achievements.slice(0, 2).map(achievement => (
                  <div key={achievement.id} className="flex items-center p-2 bg-light rounded-lg">
                    <div className={`flex-shrink-0 h-10 w-10 ${
                      achievement.id % 2 === 0 ? 'bg-primary' : 'bg-accent'
                    } rounded-full flex items-center justify-center text-white`}>
                      {achievement.id % 2 === 0 ? <FaStar /> : <FaAward />}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-dark">{achievement.name}</p>
                      <p className="text-xs text-dark-light">
                        Completed {formatDistanceToNow(new Date(achievement.completedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className={`${
                        achievement.id % 2 === 0 
                          ? 'bg-primary bg-opacity-10 text-primary' 
                          : 'bg-accent bg-opacity-10 text-accent'
                        } text-xs px-2 py-1 rounded-full`}>
                        +{achievement.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
