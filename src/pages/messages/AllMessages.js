import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageHeader from "./MessageHeader";
import MessagesChat from "./MessagesChat";
import SendMessages from "./SendMessages";
import UserProfile from "../UserProfile";

function AllMessages() {
  const navigate = useNavigate();
  const [msgClick, setMsgClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  function onBackClick() {
    setProfileClick(false);
  }
  return (
    <div>
      <div
        className={`all-messages flex gap-2 w-full ${
          !msgClick && "mx-auto"
        } hidden md:block`}
      >
        <div className="w-[30%]">
          {Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((item) => (
            <div
              className="h-[70px] rounded-sm m-2  bg-black cursor-pointer flex items-center p-3 hover:scale-110 transform duration-500 ease-in-out"
              onClick={() => {
                setMsgClick(true);
                navigate(`/messages?msgId=${item}`);
              }}
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
        <div
          className={`flex-2 ${
            profileClick ? "w-[40%]" : "w-full"
          } m-3 max-h-[80vh]`}
        >
          <MessageHeader setProfileClick={setProfileClick} />
          <MessagesChat />
          <SendMessages />
        </div>
        <div
          className={`flex-2 ${profileClick ? "block" : "hidden"} w-[30%] p-3`}
        >
          <UserProfile handleBack={onBackClick} />
        </div>
      </div>
      <div className="block md:hidden">
        {!profileClick && !msgClick && (
          <div className="w-full">
            {Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((item) => (
              <div
                className="h-[70px] rounded-sm m-2  bg-black cursor-pointer flex items-center p-3 hover:scale-110 transform duration-500 ease-in-out"
                onClick={() => {
                  setMsgClick(true);
                  navigate(`/messages?msgId=${item}`);
                }}
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
        )}

        {msgClick && !profileClick && (
          <div>
            <div
              className="mb-2 cursor-pointer"
              onClick={() => {
                setMsgClick(false);
                setProfileClick(false);
              }}
            >
              {"< Back"}
            </div>
            <MessageHeader setProfileClick={setProfileClick} />
            <MessagesChat />
            <SendMessages />
          </div>
        )}

        {msgClick && profileClick && (
          <div>
            <UserProfile handleBack={onBackClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMessages;
