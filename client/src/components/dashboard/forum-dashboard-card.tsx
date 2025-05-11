import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForum } from "@/hooks/use-forum";
import { formatDistanceToNow } from "date-fns";
import { FaComment } from "react-icons/fa";

const ForumDashboardCard = () => {
  const { forumPosts, isLoading, createPost } = useForum();

  const handleCreatePost = () => {
    // Use client navigation instead of direct window.location
    window.history.pushState({}, "", "/community");
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-dark">Community Forum</CardTitle>
          <a href="/community" className="text-sm text-primary hover:underline">View Forum</a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 custom-scrollbar overflow-y-auto max-h-64">
          {isLoading ? (
            <p className="text-center py-4 text-dark-light">Loading forum posts...</p>
          ) : (
            forumPosts.slice(0, 3).map(post => (
              <div key={post.id} className="border-b border-gray-100 pb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-dark-light">{post.category}</span>
                  <div className="flex items-center text-xs text-dark-light">
                    <FaComment className="mr-1" />
                    <span>{post.commentCount}</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-dark hover:text-primary cursor-pointer">
                  {post.title}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-dark-light">by @user{post.userId}</span>
                  <span className="mx-2 text-dark-light">•</span>
                  <span className="text-xs text-dark-light">
                    {typeof post.createdAt === 'string' || post.createdAt instanceof Date 
                      ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
                      : 'recently'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-100">
          <button 
            className="w-full py-2 bg-light hover:bg-gray-200 rounded-lg text-sm font-medium text-dark-medium transition-colors"
            onClick={handleCreatePost}
          >
            Create New Post
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForumDashboardCard;
