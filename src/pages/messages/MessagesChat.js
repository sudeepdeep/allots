import React from "react";
import "./Messages.css";

function MessagesChat() {
  return (
    <div className="messages relative w-full max-h-[65vh] min-h-[65vh] overflow-y-auto overflow-x-hidden px-6 py-2">
      <div>
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).map(
          (item) => (
            <div
              className={`flex ${
                item % 2 === 0 ? "justify-start" : "justify-end"
              }  `}
            >
              <div
                className={`w-[500px] flex rounded-lg p-1 min-h-[60px] h-auto m-2 ${
                  item % 2 === 0 ? "bg-blue-300 " : "bg-[#005C4B]"
                }`}
              >
                {item}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MessagesChat;
