import React from "react";
import { UserInfo } from "../../data/userData";
import { getBadge } from "../../utils/getBadge";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import UserRoleBadge from "../Common/UserRoleBadge";
import {
  PencilSquareIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

interface UserCardProps {
  userCard: UserInfo;
}

const UserCard: React.FC<UserCardProps> = ({ userCard }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const badge = getBadge(userCard.reputation);
  const navigate = useNavigate();

  const canModifyUser =
    user.role_id > 0 &&
    user.user_id !== userCard.user_id &&
    user.role_id > userCard.role_id;

  return (
    <div className="w-80 p-4">
      <div className="relative rounded-2xl border-2 border-base-content/15 bg-base-100 p-6 shadow-md shadow-blue-300 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden p-1">
            <img
              src={badge.image}
              alt={`${badge.title} Badge`}
              className="h-full w-full rounded-br-3xl rounded-tl-3xl object-cover"
            />
          </div>

          <h2
            className="mb-2 w-full truncate text-center font-mono text-2xl font-bold"
            title={userCard.username}
          >
            {userCard.username}
          </h2>

          <p className="mb-4 font-mono text-sm text-success">{badge.title}</p>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between border-t border-base-content/15 py-2">
              <span className="text-base-content/75">Reputation</span>
              <span className="font-medium">{userCard.reputation}</span>
            </div>

            <div className="flex justify-between border-t border-base-content/15 py-2">
              <span className="text-base-content/75">Role</span>
              <span className="font-medium">
                {userCard.role_id > 0 ? (
                  <UserRoleBadge roleId={userCard.role_id} />
                ) : (
                  "Member"
                )}
              </span>
            </div>

            <div className="flex justify-between border-t border-base-content/15 py-2">
              <span className="text-base-content/75">Member Since</span>
              <span className="font-medium">
                {new Date(userCard.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {user.user_id === userCard.user_id && (
            <div className="mt-4 flex w-full flex-col gap-2">
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={() => navigate("/change-username")}
              >
                <PencilSquareIcon className="h-4 w-4" />
                Change Username
              </button>
              <button
                className="btn btn-outline btn-secondary btn-sm"
                onClick={() => navigate("/change-password")}
              >
                <LockClosedIcon className="h-4 w-4" />
                Change Password
              </button>
            </div>
          )}

          {user.role_id > 0 && canModifyUser && (
            <div className="mt-4 flex w-full flex-col gap-2">
              <div className="divider text-sm text-base-content/75">
                Moderator Control
              </div>
              <button
                className={
                  !userCard.is_banned
                    ? "btn btn-outline btn-error btn-sm"
                    : "btn btn-error btn-sm"
                }
                onClick={() => navigate(`/ban-user/${userCard.username}`)}
              >
                <XCircleIcon className="h-4 w-4" />
                {userCard.is_banned ? "Unban User" : "Ban User"}
              </button>
              {user.role_id > 1 && (
                <button
                  className={
                    userCard.role_id == 1
                      ? "btn btn-success btn-sm"
                      : "btn btn-outline btn-success btn-sm"
                  }
                  onClick={() =>
                    navigate(`/assign-moderator/${userCard.username}`)
                  }
                >
                  <ShieldCheckIcon className="h-4 w-4" />
                  {userCard.role_id == 1
                    ? "Remove Moderator"
                    : "Assign as Moderator"}
                </button>
              )}
            </div>
          )}

          <div className="mt-6 flex w-full items-center justify-center font-mono text-xs text-base-content/75">
            <span>OLYMPLIANCE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
