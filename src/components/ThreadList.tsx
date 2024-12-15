import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  EyeIcon,
  ChatBubbleLeftIcon,
  ArrowUpIcon,
  ClockIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

import grandmasterBadge from "../assets/01_badges_grandmaster.png";
import masterBadge from "../assets/02_badges_master.png";
import candidateMasterBadge from "../assets/03_badges_candidate_master.png";
import expertBadge from "../assets/04_badges_expert.png";
import specialistBadge from "../assets/05_badges_specialist.png";
import apprenticeBadge from "../assets/06_badges_apprentice.png";
import pupilBadge from "../assets/07_badges_pupil.png";
import noviceBadge from "../assets/08_badges_novice.png";

interface ThreadListProps {
  categoryId: number;
}

interface UserInfo {
  username: string;
  reputation: number;
  role_id: number;
  is_banned: boolean;
}

interface ThreadData {
  thread_id: number;
  user_id: number;
  title: string;
  content: string;
  stats: {
    followers: number;
    upvotes: number;
    downvotes: number;
    comments: number;
    views: number;
  };
  created_at: string;
  updated_at: string;
  tags: string[];
}

const SORT_OPTIONS = [
  { value: "followers", label: "Most Followed" },
  { value: "upvotes", label: "Top Upvoted" },
  { value: "comments", label: "Most Commented" },
  { value: "created_at", label: "Newest" },
  { value: "updated_at", label: "Recently Updated" },
];

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

const ThreadList: React.FC<ThreadListProps> = ({ categoryId }) => {
  const [threads, setThreads] = useState<(ThreadData & { user?: UserInfo })[]>(
    [],
  );
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const threadsResponse = await axios.get(
          `${apiUrl}/api/threads/category/${categoryId}`,
          {
            params: {
              sort_by: sortBy,
              page: page,
              per_page: 10,
            },
          },
        );

        const threadsWithUsers = await Promise.all(
          threadsResponse.data.map(async (thread: ThreadData) => {
            const userResponse = await axios.get(
              `${apiUrl}/api/users/${thread.user_id}`,
            );
            return { ...thread, user: userResponse.data };
          }),
        );

        setThreads(threadsWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching threads:", error);
        setLoading(false);
      }
    };

    fetchThreads();
  }, [categoryId, sortBy, page]);

  const renderThreadCard = (thread: ThreadData & { user?: UserInfo }) => {
    const badge = thread.user ? getBadgeImage(thread.user.reputation) : null;

    return (
      <div
        key={thread.thread_id}
        className="card mb-4 bg-base-100 shadow-md transition-all hover:shadow-xl"
      >
        <div className="card-body">
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              {badge && (
                <div className="avatar placeholder mb-2">
                  <div className="bg-neutral-focus h-12 w-12 rounded-full text-neutral-content">
                    <img
                      src={badge.image}
                      alt={`${badge.title} Badge`}
                      className="h-8 w-8"
                    />
                  </div>
                </div>
              )}
              {thread.user && (
                <div className="text-center">
                  <p
                    className={`font-semibold ${thread.user.is_banned ? "text-error" : ""}`}
                  >
                    {thread.user.username}
                    {thread.user.is_banned && (
                      <NoSymbolIcon className="ml-1 inline h-4 w-4 text-error" />
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {badge?.title}: {thread.user.reputation}
                  </p>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="card-title text-lg">{thread.title}</h3>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <EyeIcon className="h-4 w-4" />
                <span>{thread.stats.views} Views</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ArrowUpIcon className="h-4 w-4 text-success" />
                <span>{thread.stats.upvotes} Upvotes</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <span>{thread.stats.comments} Comments</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ClockIcon className="h-4 w-4" />
                <span>{new Date(thread.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <select
          className="select select-bordered mx-auto max-w-xs"
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
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!loading && threads.length === 0 && (
        <div className="text-center text-base-content/50">
          No threads found in this category.
        </div>
      )}

      {!loading && threads.map(renderThreadCard)}

      <div className="mt-6 flex justify-center">
        <div className="join">
          <button
            className="btn join-item"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            «
          </button>
          <button className="btn join-item">{page}</button>
          <button
            className="btn join-item"
            disabled={threads.length < 10}
            onClick={() => setPage(page + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadList;
