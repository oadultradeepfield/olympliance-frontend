import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import grandmasterBadge from "../../assets/01_badges_grandmaster.png";
import masterBadge from "../../assets/02_badges_master.png";
import candidateMasterBadge from "../../assets/03_badges_candidate_master.png";
import expertBadge from "../../assets/04_badges_expert.png";
import specialistBadge from "../../assets/05_badges_specialist.png";
import apprenticeBadge from "../../assets/06_badges_apprentice.png";
import pupilBadge from "../../assets/07_badges_pupil.png";
import noviceBadge from "../../assets/08_badges_novice.png";

const getBadgeImage = (reputation: number) => {
  if (reputation >= 3500)
    return { image: grandmasterBadge, title: "Grandmaster" };
  if (reputation >= 2000) return { image: masterBadge, title: "Master" };
  if (reputation >= 800)
    return { image: candidateMasterBadge, title: "Candidate Master" };
  if (reputation >= 400) return { image: expertBadge, title: "Expert" };
  if (reputation >= 100) return { image: specialistBadge, title: "Specialist" };
  if (reputation >= 50) return { image: apprenticeBadge, title: "Apprentice" };
  if (reputation >= 15) return { image: pupilBadge, title: "Pupil" };
  return { image: noviceBadge, title: "Novice" };
};

interface ThreadCommentProps {
  threadId: number;
}

interface CommentData {
  comment_id: number;
  user_id: number;
  content: string;
  stats: {
    upvotes: number;
    downvotes: number;
  };
  created_at: string;
}

interface UserInfo {
  username: string;
  reputation: number;
  role_id: number;
}

const SORT_OPTIONS = [
  { value: "upvotes", label: "Top Upvoted" },
  { value: "created_at", label: "Oldest" },
];

const ThreadComment: React.FC<ThreadCommentProps> = ({ threadId }) => {
  const [comments, setComments] = useState<
    (CommentData & { user?: UserInfo })[]
  >([]);
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const commentsResponse = await axios.get(`${apiUrl}/api/comments`, {
          params: {
            thread_id: threadId,
            sort_by: sortBy,
            page: page,
            per_page: 10,
          },
        });

        const commentsWithUsers = await Promise.all(
          commentsResponse.data.comments.map(async (comment: CommentData) => {
            const userResponse = await axios.get(
              `${apiUrl}/api/users/${comment.user_id}`,
            );
            return { ...comment, user: userResponse.data };
          }),
        );

        setComments(commentsWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [threadId, sortBy, page]);

  const renderCommentCard = (comment: CommentData & { user?: UserInfo }) => {
    const badge = comment.user ? getBadgeImage(comment.user.reputation) : null;
    const getRoleBadge = () => {
      switch (comment.user?.role_id) {
        case 1:
          return (
            <div className="badge badge-secondary mr-2 items-center text-xs font-semibold">
              <ShieldCheckIcon className="mr-1 h-3 w-3" /> Moderator
            </div>
          );
        case 2:
          return (
            <div className="badge badge-success mr-2 items-center text-xs font-semibold">
              <StarIcon className="mr-1 h-3 w-3" /> Admin
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div
        key={comment.comment_id}
        className="card mx-auto mb-3 flex w-full max-w-5xl border-2 bg-base-100 px-2 py-1"
      >
        <div className="card-body flex flex-row items-center p-3">
          {badge && (
            <div className="avatar mr-3 shrink-0">
              <div className="bg-neutral-focus h-10 w-10 rounded-full text-neutral-content">
                <img
                  src={badge.image}
                  alt={`${badge.title} Badge`}
                  className="h-8 w-8"
                />
              </div>
            </div>
          )}
          <div className="flex flex-grow flex-col">
            <div className="mb-1 text-base">
              {getRoleBadge()}
              {comment.content}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75">
              <div className="flex items-center space-x-1">
                <ArrowUpIcon className="h-4 w-4 text-success" />
                <span>{comment.stats.upvotes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ArrowDownIcon className="h-4 w-4 text-error" />
                <span>{comment.stats.downvotes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>
                  Author: {comment.user?.username}
                  {badge && (
                    <span className="ml-1 text-xs">
                      ({badge.title}: {comment.user?.reputation})
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Comments</div>
        <select
          className="select select-bordered max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Sort by: {option.label}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-base-content/75"></span>
        </div>
      )}

      {!loading && comments.length === 0 && (
        <div className="text-center text-base-content/50">
          No comments found for this thread. Be the first one to start the
          conversation.
        </div>
      )}

      {!loading && comments.map(renderCommentCard)}

      <div className="mb-8 mt-12 flex justify-center">
        <div className="join">
          <button
            className="btn join-item"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            «
          </button>
          <button className="btn join-item pointer-events-none">
            Page {page}
          </button>
          <button
            className="btn join-item"
            disabled={comments.length < 10}
            onClick={() => setPage(page + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadComment;