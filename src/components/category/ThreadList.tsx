import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ChatBubbleLeftIcon,
  ArrowUpIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowDownIcon,
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

interface ThreadListProps {
  categoryId: number;
  categoryTitle: string;
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
  };
  created_at: string;
  updated_at: string;
  tags: string[];
}

const SORT_OPTIONS = [
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

const slugify = (title: string, wordLimit: number = 5) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .slice(0, wordLimit)
    .join("-");
};

const ThreadList: React.FC<ThreadListProps> = ({
  categoryId,
  categoryTitle,
}) => {
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
              per_page: 5,
            },
          },
        );

        const threadsWithUsers = await Promise.all(
          threadsResponse.data.threads.map(async (thread: ThreadData) => {
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
    const getRoleBadge = () => {
      switch (thread.user?.role_id) {
        case 1:
          return (
            <div className="badge badge-secondary mr-2 items-center text-xs">
              <ShieldCheckIcon className="mr-1 h-3 w-3" /> Moderator
            </div>
          );
        case 2:
          return (
            <div className="badge badge-success mr-2 items-center text-xs">
              <StarIcon className="mr-1 h-3 w-3" /> Admin
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Link
        key={thread.thread_id}
        to={`/thread/${categoryTitle}-${slugify(thread.title)}-${thread.thread_id}`}
      >
        <div
          key={thread.thread_id}
          className="card mx-auto mb-3 flex w-full max-w-3xl border-2 bg-base-100 px-2 py-1 transition-all duration-300 hover:border-secondary hover:text-secondary"
        >
          <div className="card-body flex flex-row items-start p-3">
            {badge && (
              <div className="avatar mr-3 mt-1 shrink-0">
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
              <div
                className="mb-1 text-base font-semibold"
                title={thread.title}
              >
                {getRoleBadge()}
                {thread.title}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75">
                <div className="flex items-center space-x-1">
                  <ArrowUpIcon className="h-4 w-4 text-success" />
                  <span>{thread.stats.upvotes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowDownIcon className="h-4 w-4 text-error" />
                  <span>{thread.stats.downvotes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChatBubbleLeftIcon className="h-4 w-4" />
                  <span>{thread.stats.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>
                    {new Date(thread.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>
                    Author: {thread.user?.username}
                    {badge && (
                      <span className="ml-1 text-xs">
                        ({badge.title}: {thread.user?.reputation})
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex items-center justify-between">
        <select
          className="select select-bordered mx-auto max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-base-content/75"></span>
        </div>
      )}

      {!loading && threads.length === 0 && (
        <div className="text-center text-base-content/50">
          No threads found in this category.
        </div>
      )}

      {!loading && threads.map(renderThreadCard)}

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
            disabled={threads.length < 5}
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
