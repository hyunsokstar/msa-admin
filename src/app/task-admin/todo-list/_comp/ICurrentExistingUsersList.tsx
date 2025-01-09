// ICurrentExistingUsersList.tsx

"use client";

import React from 'react';

interface User {
  name: string;
  status: 'online' | 'away';
}

const ICurrentExistingUsersList = () => {
  const users: IUser[] = [
    { name: "terecal", status: "online" },
    { name: "Jane Cooper", status: "online" },
    { name: "Robert Fox", status: "away" }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">접속자 ({users.length})</h3>
      {users.map((user, index) => (
        <div
          key={index}
          className="flex items-center gap-3"
        >
          <div className={`w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-800">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ICurrentExistingUsersList;
