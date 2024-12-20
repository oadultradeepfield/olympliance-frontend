export interface Interaction {
  interaction_id: number;
  user_id: number;
  thread_id: number;
  interaction_type: string;
}

export interface InteractionState {
  upvote: { active: boolean; id: number };
  downvote: { active: boolean; id: number };
  follow: { active: boolean; id: number };
}
