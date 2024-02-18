import React from "react";

function MessageHeader({ setProfileClick = false }) {
  return (
    <div className="h-[9vh] bg-black border-b-2 border-slate-100 flex items-center gap-4 p-3">
      <div className="profile h-[40px] rounded-full bg-slate-100 w-[40px]"></div>
      <div className="cursor-pointer" onClick={() => setProfileClick(true)}>
        <div>Test</div>
        <div className="text-[10px]">Active</div>
      </div>
    </div>
  );
}

export default MessageHeader;
