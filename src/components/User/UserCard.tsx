import React from "react";
import { UserInfo } from "../../data/userData";
import { getBadge } from "../../utils/getBadge";

interface UserCardProps {
  userCard: UserInfo;
}

const UserCard: React.FC<UserCardProps> = ({ userCard }) => {
  const badge = getBadge(userCard.reputation);

  return (
    <div className="w-80 p-4">
      <div className="relative rounded-2xl border-2 border-base-content/15 bg-base-100 p-6 shadow-md shadow-blue-300 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden p-1">
            <img
              src={badge.image}
              alt={`${badge.title} Badge`}
              className="h-full w-full rounded-br-3xl rounded-tl-3xl object-cover"
            />
          </div>

          <h2 className="mb-2 font-mono text-2xl font-bold">
            {userCard.username}
          </h2>

          <p className="mb-4 font-mono text-sm text-success">{badge.title}</p>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between border-t border-base-content/15 py-2">
              <span className="text-base-content/75">Reputation</span>
              <span className="font-medium">{userCard.reputation}</span>
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

          <div className="mt-6 flex w-full items-center justify-center font-mono text-xs text-base-content/75">
            <span>OLYMPLIANCE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
