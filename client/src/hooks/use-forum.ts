import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ForumPost } from "@shared/schema";
import { useBiohack } from "./use-biohack";
import { useToast } from "./use-toast";

export function useForum() {
  const { userId } = useBiohack();
  const { toast } = useToast();

  const { data: forumPosts = [], isLoading } = useQuery<ForumPost[]>({
    queryKey: ['/api/forum-posts'],
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: { title: string; content: string; category: string }) => {
      return apiRequest('POST', '/api/forum-posts', {
        ...postData,
        userId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/forum-posts'] });
      toast({
        title: "Post created",
        description: "Your post has been published to the forum",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const commentMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: number, content: string }) => {
      return apiRequest('POST', '/api/forum-comments', {
        postId,
        userId,
        content
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/forum-posts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/forum-comments', { postId: variables.postId }] });
      toast({
        title: "Comment added",
        description: "Your comment has been added to the post",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add comment",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    forumPosts,
    isLoading,
    createPost: (postData: { title: string; content: string; category: string }) => 
      createPostMutation.mutate(postData),
    isCreatingPost: createPostMutation.isPending,
    addComment: (postId: number, content: string) => 
      commentMutation.mutate({ postId, content }),
    isAddingComment: commentMutation.isPending
  };
}
