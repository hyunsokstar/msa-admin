// components/IProfileCardForCurrentUser.tsx
"use client";

import { useUserStore } from "@/store/useUserStore";
import React from "react";

const IProfileCardForCurrentUser = () => {
  const { user } = useUserStore();

  return (
    <div className="w-full p-4 border rounded shadow-sm">
      {/* profile?: {user?.profile_image_url} */}
      <div className="flex items-center space-x-3">
        <img
          src={user?.profile_image_url || "/api/placeholder/40/40"}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{user?.email || "Unknown User"}</h3>
          <p className="text-sm text-gray-500">
            {user?.is_admin ? "Administrator" : "Developer"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IProfileCardForCurrentUser;
