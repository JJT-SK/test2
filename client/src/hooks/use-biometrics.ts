import { useQuery } from "@tanstack/react-query";
import { useBiohack } from "./use-biohack";
import { Biometric } from "@shared/schema";

type MetricType = 'sleepQuality' | 'energyLevel' | 'stressLevel' | 'focusLevel' | 'moodLevel';

export function useBiometrics() {
  const { userId } = useBiohack();
  
  const { data: biometrics = [], isLoading } = useQuery<Biometric[]>({
    queryKey: ['/api/biometrics/recent', { userId, days: 30 }],
    enabled: !!userId
  });
  
  // Calculate metrics from biometric data
  const calculateMetrics = () => {
    const metrics: Record<MetricType, number[]> = {
      sleepQuality: [],
      energyLevel: [],
      stressLevel: [],
      focusLevel: [],
      moodLevel: []
    };
    
    // Extract all metric values from biometrics
    biometrics.forEach(biometric => {
      if (biometric.sleepQuality !== undefined) metrics.sleepQuality.push(biometric.sleepQuality);
      if (biometric.energyLevel !== undefined) metrics.energyLevel.push(biometric.energyLevel);
      if (biometric.stressLevel !== undefined) metrics.stressLevel.push(biometric.stressLevel);
      if (biometric.focusLevel !== undefined) metrics.focusLevel.push(biometric.focusLevel);
      if (biometric.moodLevel !== undefined) metrics.moodLevel.push(biometric.moodLevel);
    });
    
    // Calculate averages
    const averages = {
      sleepQuality: calculateAverage(metrics.sleepQuality),
      energyLevel: calculateAverage(metrics.energyLevel),
      stressLevel: calculateAverage(metrics.stressLevel),
      focusLevel: calculateAverage(metrics.focusLevel),
      moodLevel: calculateAverage(metrics.moodLevel)
    };
    
    // Calculate highest values
    const highest = {
      sleepQuality: Math.max(...metrics.sleepQuality, 0),
      energyLevel: Math.max(...metrics.energyLevel, 0),
      stressLevel: Math.max(...metrics.stressLevel, 0),
      focusLevel: Math.max(...metrics.focusLevel, 0),
      moodLevel: Math.max(...metrics.moodLevel, 0)
    };
    
    // Calculate consistency (standard deviation as a percentage of the mean)
    const consistency = {
      sleepQuality: calculateConsistency(metrics.sleepQuality),
      energyLevel: calculateConsistency(metrics.energyLevel),
      stressLevel: calculateConsistency(metrics.stressLevel),
      focusLevel: calculateConsistency(metrics.focusLevel),
      moodLevel: calculateConsistency(metrics.moodLevel)
    };
    
    // Calculate weekly averages (for the bar chart)
    // Split data into 4 weeks
    const weeklyAverages = [];
    const biometricsByWeek = splitByWeeks(biometrics, 4);
    
    for (let weekData of biometricsByWeek) {
      const weekMetrics: Record<MetricType, number[]> = {
        sleepQuality: [],
        energyLevel: [],
        stressLevel: [],
        focusLevel: [],
        moodLevel: []
      };
      
      weekData.forEach(biometric => {
        if (biometric.sleepQuality !== undefined) weekMetrics.sleepQuality.push(biometric.sleepQuality);
        if (biometric.energyLevel !== undefined) weekMetrics.energyLevel.push(biometric.energyLevel);
        if (biometric.stressLevel !== undefined) weekMetrics.stressLevel.push(biometric.stressLevel);
        if (biometric.focusLevel !== undefined) weekMetrics.focusLevel.push(biometric.focusLevel);
        if (biometric.moodLevel !== undefined) weekMetrics.moodLevel.push(biometric.moodLevel);
      });
      
      weeklyAverages.push({
        sleepQuality: calculateAverage(weekMetrics.sleepQuality),
        energyLevel: calculateAverage(weekMetrics.energyLevel),
        stressLevel: calculateAverage(weekMetrics.stressLevel),
        focusLevel: calculateAverage(weekMetrics.focusLevel),
        moodLevel: calculateAverage(weekMetrics.moodLevel)
      });
    }
    
    return {
      averages,
      highest,
      consistency,
      weeklyAverages
    };
  };
  
  // Helper function to calculate average
  const calculateAverage = (values: number[]): number => {
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  };
  
  // Helper function to calculate consistency (100 - coefficient of variation)
  const calculateConsistency = (values: number[]): number => {
    if (values.length < 2) return 100;
    const avg = calculateAverage(values);
    const squareDiffs = values.map(value => (value - avg) ** 2);
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    const coefficientOfVariation = (stdDev / avg) * 100;
    return Math.round(100 - coefficientOfVariation); // Higher number = more consistent
  };
  
  // Helper function to split biometrics into specified number of weeks
  const splitByWeeks = (biometrics: Biometric[], weeks: number): Biometric[][] => {
    const result: Biometric[][] = Array(weeks).fill(null).map(() => []);
    if (biometrics.length === 0) return result;
    
    // Sort biometrics by date (oldest first)
    const sorted = [...biometrics].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const chunkSize = Math.ceil(sorted.length / weeks);
    
    for (let i = 0; i < weeks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, sorted.length);
      if (start < sorted.length) {
        result[i] = sorted.slice(start, end);
      }
    }
    
    return result;
  };
  
  const metrics = calculateMetrics();
  
  return {
    biometrics,
    isLoading,
    metrics
  };
}
