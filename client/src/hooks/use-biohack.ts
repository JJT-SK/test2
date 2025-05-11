import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "./use-toast";

// Default user ID for this demo - in a real app, this would come from authentication
const DEFAULT_USER_ID = 1;

export function useBiohack() {
  const { toast } = useToast();
  const userId = DEFAULT_USER_ID;

  const { data: user, isLoading } = useQuery({
    queryKey: [`/api/users/${userId}`],
  });

  const checkInMutation = useMutation({
    mutationFn: async (biometrics: {
      sleepQuality?: number;
      energyLevel?: number;
      stressLevel?: number;
      focusLevel?: number;
      moodLevel?: number;
      notes?: string;
    }) => {
      return apiRequest('POST', '/api/check-in', {
        userId,
        biometrics
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/biometrics/recent'] });
      toast({
        title: "Check-in successful",
        description: "Your biometrics have been recorded",
      });
    },
    onError: (error) => {
      toast({
        title: "Check-in failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Get count of active protocols
  const { data: protocols = [] } = useQuery({
    queryKey: ['/api/protocols/active', { userId }],
    enabled: !!userId
  });

  return {
    userId,
    biohackScore: user?.biohackScore || 0,
    lastCheckIn: user?.lastCheckIn,
    currentStreak: user?.currentStreak || 0,
    activeProtocols: protocols.length,
    isLoading,
    checkIn: (biometrics: any) => checkInMutation.mutate(biometrics),
    isCheckingIn: checkInMutation.isPending
  };
}
