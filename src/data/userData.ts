export interface UserInfo {
  user_id: number;
  username: string;
  reputation: number;
  role_id: number;
  created_at: Date | null;
  is_banned: boolean;
  is_deleted: boolean;
}
