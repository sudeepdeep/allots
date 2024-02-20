import React from "react";
import "./Messages.css";

function MessagesChat({ chat = false }) {
  return (
    <div className="messages relative w-full max-h-[65vh] min-h-[65vh] overflow-y-auto overflow-x-hidden px-6 py-2">
      <div>
        {chat?.messages?.map((item, index) => (
          <div
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }  `}
          >
            <div
              className={`w-[500px] flex rounded-lg p-1 min-h-[60px] h-auto m-2 ${
                index % 2 === 0 ? "bg-blue-300 " : "bg-[#005C4B]"
              }`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesChat;
