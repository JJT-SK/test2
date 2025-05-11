import { formatDistanceToNow } from "date-fns";
import { FaComment } from "react-icons/fa";
import { ForumPost } from "@shared/schema";

interface ForumPostProps {
  post: ForumPost;
  onClick?: (post: ForumPost) => void;
  showContent?: boolean;
}

const ForumPostCard = ({ post, onClick, showContent = false }: ForumPostProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4 ${
        onClick ? 'cursor-pointer hover:border-gray-300 transition-colors' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between mb-2">
        <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full">
          {post.category}
        </span>
        <div className="flex items-center text-xs text-dark-light">
          <FaComment className="mr-1" />
          <span>{post.commentCount}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-dark mb-1">{post.title}</h3>
      
      {showContent && (
        <div className="text-dark-medium text-sm mb-3">{post.content}</div>
      )}
      
      <div className="flex items-center text-xs text-dark-light mt-2">
        <span>by @user{post.userId}</span>
        <span className="mx-2">•</span>
        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
      </div>
    </div>
  );
};

export default ForumPostCard;
