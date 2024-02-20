import React from "react";

function MessageHeader({ setProfileClick = false, user = false }) {
  return (
    <div className="h-[9vh] bg-black border-b-2 border-slate-100 flex items-center gap-4 p-3">
      <div className="pp rounded-full w-[50px] h-[50px]">
        <img
          src={user.profileUrl}
          alt="profilepic"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="cursor-pointer" onClick={() => setProfileClick(true)}>
        <div>{user.username}</div>
        <div className="text-[10px]">Active</div>
      </div>
    </div>
  );
}

export default MessageHeader;
