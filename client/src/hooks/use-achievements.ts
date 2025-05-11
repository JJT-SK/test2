import { useQuery } from "@tanstack/react-query";
import { Achievement } from "@shared/schema";
import { useBiohack } from "./use-biohack";

export function useAchievements() {
  const { userId } = useBiohack();

  const { data: achievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements', { userId }],
    enabled: !!userId
  });

  // Calculate stats
  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const completedCount = achievements.length;

  return {
    achievements,
    isLoading,
    stats: {
      totalPoints,
      completedCount
    }
  };
}
