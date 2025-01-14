export interface ThreadData {
  thread_id: number;
  user_id: number;
  title: string;
  content: string;
  category_id: number;
  stats: {
    followers: number;
    upvotes: number;
    downvotes: number;
    comments: number;
  };
  created_at: string;
  updated_at: string;
  tags: string[];
}
