import React, { useEffect } from "react";
import { socket } from "../../socket";
import { useNavigate, useParams } from "react-router-dom";

function Messages() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("message", { messageId: id });
    socket.on(id, ({ msgId }) => console.log(msgId));
    return () => {
      socket.off(id);
    };
  }, []);
  return (
    <div className="max-w-md mx-auto">
      {Array.from([0, 1, 2, 3, 4, 5]).map((item) => (
        <div
          className="h-[70px] rounded-sm m-2 bg-red-400 cursor-pointer flex items-center p-3"
          onClick={() => navigate(`${item}`)}
          key={item}
        >
          <div className="pp rounded-full bg-slate-400 w-[50px] h-[50px]"></div>
          <div className="ml-3">
            <div className="name">Name - {item}</div>
            <div className="name">Message - {item}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;
