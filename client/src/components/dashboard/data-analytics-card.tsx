import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Ellipsis } from "lucide-react";
import { format } from "date-fns";
import { useBiohack } from "@/hooks/use-biohack";

const DataAnalyticsCard = () => {
  const { userId } = useBiohack();
  
  const { data: biometrics, isLoading } = useQuery({
    queryKey: ['/api/biometrics/recent', { userId, days: 7 }],
    enabled: !!userId
  });

  // Format data for the chart
  const chartData = biometrics?.map(biometric => ({
    day: format(new Date(biometric.date), 'EEE'),
    sleepQuality: biometric.sleepQuality,
    energyLevel: biometric.energyLevel
  })) || [];

  // Get latest metrics
  const latestMetrics = biometrics?.[biometrics.length - 1] || {};
  const sleepQuality = latestMetrics.sleepQuality || 0;
  const energyLevel = latestMetrics.energyLevel || 0;

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-dark">Data Analytics</CardTitle>
          <button className="text-primary hover:text-blue-700">
            <Ellipsis />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-48">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <p>Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend align="center" verticalAlign="bottom" height={36} />
                  <Line 
                    type="monotone" 
                    dataKey="sleepQuality" 
                    name="Sleep Quality" 
                    stroke="#3B82F6" 
                    fill="rgba(59, 130, 246, 0.1)" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energyLevel" 
                    name="Energy Level" 
                    stroke="#10B981" 
                    fill="rgba(16, 185, 129, 0.1)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-dark-light text-xs mb-1">Sleep Quality</p>
              <p className="text-primary font-semibold">{sleepQuality}%</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-dark-light text-xs mb-1">Energy Level</p>
              <p className="text-secondary font-semibold">{energyLevel}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataAnalyticsCard;
