import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Protocol } from "@shared/schema";
import { useBiohack } from "./use-biohack";
import { useToast } from "./use-toast";

export function useProtocols() {
  const { userId } = useBiohack();
  const { toast } = useToast();

  const { data: protocols = [], isLoading } = useQuery<Protocol[]>({
    queryKey: ['/api/protocols/active', { userId }],
    enabled: !!userId
  });

  const checkInMutation = useMutation({
    mutationFn: async (protocolId: number) => {
      return apiRequest('POST', '/api/protocol-check-ins', {
        protocolId,
        userId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/protocols/active'] });
      toast({
        title: "Check-in successful",
        description: "Your protocol progress has been updated",
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

  const createProtocolMutation = useMutation({
    mutationFn: async (protocolData: { name: string; description: string; duration: number }) => {
      return apiRequest('POST', '/api/protocols', {
        ...protocolData,
        userId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/protocols/active'] });
      toast({
        title: "Protocol created",
        description: "Your new protocol has been added",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create protocol",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteProtocolMutation = useMutation({
    mutationFn: async (protocolId: number) => {
      return apiRequest('DELETE', `/api/protocols/${protocolId}`, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/protocols/active'] });
      toast({
        title: "Protocol deleted",
        description: "Your protocol has been removed",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete protocol",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    protocols,
    isLoading,
    checkInProtocol: (protocolId: number) => checkInMutation.mutate(protocolId),
    isCheckingIn: checkInMutation.isPending,
    createProtocol: (protocolData: { name: string; description: string; duration: number }) => 
      createProtocolMutation.mutate(protocolData),
    isCreating: createProtocolMutation.isPending,
    deleteProtocol: (protocolId: number) => deleteProtocolMutation.mutate(protocolId),
    isDeleting: deleteProtocolMutation.isPending
  };
}
