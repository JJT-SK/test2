import { useState } from "react";
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
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useBiohack } from "@/hooks/use-biohack";
import { useBiometrics } from "@/hooks/use-biometrics";
import MetricCard from "@/components/data-analysis/metric-card";
import ChatAssistant from "@/components/data-analysis/chat-assistant";
import { useProtocols } from "@/hooks/use-protocols";

const categories = [
  { id: "sleep", label: "Sleep" },
  { id: "energy", label: "Energy" },
  { id: "cognitive", label: "Cognitive" }
];

const DataAnalysis = () => {
  const { userId } = useBiohack();
  const { biometrics, isLoading, metrics } = useBiometrics();
  const { protocols } = useProtocols();
  const [activeCategory, setActiveCategory] = useState("sleep");
  
  // Get active protocol (for demo, we'll use the first one or a default)
  const activeProtocol = protocols[0] || {
    name: "No active protocol",
    currentDay: 0,
    duration: 0
  };
  
  // Format data for charts based on the selected category
  const getMetricDataKey = (category: string) => {
    switch (category) {
      case "sleep": return "sleepQuality";
      case "energy": return "energyLevel";
      case "cognitive": return "focusLevel";
      default: return "sleepQuality";
    }
  };
  
  const metricDataKey = getMetricDataKey(activeCategory);
  
  // Line chart data
  const lineChartData = biometrics.map(b => ({
    date: new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    [metricDataKey]: b[metricDataKey]
  }));
  
  // Comparison bar chart data
  const barChartData = [
    { name: "Week 1", value: metrics.weeklyAverages[0][metricDataKey] || 0 },
    { name: "Week 2", value: metrics.weeklyAverages[1][metricDataKey] || 0 },
    { name: "Week 3", value: metrics.weeklyAverages[2][metricDataKey] || 0 },
    { name: "Week 4", value: metrics.weeklyAverages[3][metricDataKey] || 0 }
  ];
  
  // Get metrics summary text based on category
  const getMetricsSummary = () => {
    switch (activeCategory) {
      case "sleep":
        return "Your sleep quality has improved by 12% since starting this protocol. Consistency in bedtime appears to be a key factor.";
      case "energy":
        return "Energy levels tend to peak mid-week and decline on weekends. Consider adjusting your weekend routine for more consistent energy.";
      case "cognitive":
        return "Focus and cognitive performance show strong correlation with your sleep quality. Days following 8+ hours of sleep show 15% higher focus scores.";
      default:
        return "Select a category to see personalized insights based on your biometric data.";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-dark">Data Analysis</h1>
        <p className="text-dark-light">Visualize your biohacking data and gain actionable insights.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          {/* Category Tabs and Main Data Section */}
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Data Categories</CardTitle>
                </div>
                
                <Tabs 
                  value={activeCategory} 
                  onValueChange={setActiveCategory}
                  className="mt-2 sm:mt-0"
                >
                  <TabsList>
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-dark-light">Loading biometric data...</p>
                  </div>
                ) : (
                  <div>
                    {/* Protocol Information */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="text-lg font-medium text-dark mb-2">
                        {activeProtocol.name}
                      </h3>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm text-dark-light">
                            Day {activeProtocol.currentDay} of {activeProtocol.duration}
                          </p>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${(activeProtocol.currentDay / activeProtocol.duration) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className="bg-blue-100 text-primary text-xs px-2 py-0.5 rounded-full">
                            {Math.round((activeProtocol.currentDay / activeProtocol.duration) * 100)}% Complete
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <MetricCard 
                        title="Average Score" 
                        value={metrics.averages[metricDataKey]} 
                        changePercent={5.2} 
                        isPositive={true} 
                      />
                      <MetricCard 
                        title="Highest Score" 
                        value={metrics.highest[metricDataKey]} 
                        secondaryText="Recorded on May 12" 
                      />
                      <MetricCard 
                        title="Consistency" 
                        value={metrics.consistency[metricDataKey]} 
                        suffix="%" 
                        changePercent={-2.1} 
                        isPositive={false} 
                      />
                    </div>

                    {/* Charts Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="h-64">
                        <h3 className="text-sm font-medium text-dark-light mb-2">Historical Trend</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={lineChartData}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey={metricDataKey} 
                              name={activeCategory === "sleep" ? "Sleep Quality" : 
                                    activeCategory === "energy" ? "Energy Level" : "Focus Level"} 
                              stroke="#3B82F6" 
                              strokeWidth={2}
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="h-64">
                        <h3 className="text-sm font-medium text-dark-light mb-2">Weekly Comparison</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={barChartData}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar 
                              dataKey="value" 
                              name={activeCategory === "sleep" ? "Avg Sleep Quality" : 
                                    activeCategory === "energy" ? "Avg Energy Level" : "Avg Focus Level"} 
                              fill="#8B5CF6" 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {/* Analysis Summary */}
                    <div className="mt-6 p-4 bg-light rounded-lg">
                      <h3 className="text-lg font-medium text-dark mb-2">Analysis</h3>
                      <p className="text-dark-medium">{getMetricsSummary()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="lg:w-1/4">
          {/* ChatBot Card */}
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatAssistant category={activeCategory} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
