export interface CommentData {
  comment_id: number;
  parent_comment_id: number;
  user_id: number;
  content: string;
  stats: {
    upvotes: number;
    downvotes: number;
  };
  created_at: string;
  is_deleted: boolean;
}
