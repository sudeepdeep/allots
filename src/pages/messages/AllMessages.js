import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageHeader from "./MessageHeader";
import MessagesChat from "./MessagesChat";
import SendMessages from "./SendMessages";
import UserProfile from "../UserProfile";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import axios from "../../utils/axios";
import { AnimationLoading } from "../../components/Loading";

function AllMessages() {
  const navigate = useNavigate();
  const { msgId } = useParams();
  const [msgClick, setMsgClick] = useState(false);
  const [user, setUser] = useState("");
  const [profileClick, setProfileClick] = useState(false);
  const { data, isLoading } = useQuery("user-messages", () =>
    axios(`/user-messages/${Cookies.get("userId")}`).then((res) => res.data)
  );
  const { data: roomData, isLoading: roomLoading } = useQuery(
    ["room-data", msgId],
    () =>
      axios
        .get(`/user-messages/${msgId}/${Cookies.get("userId")}`)
        .then((res) => res.data),
    {
      enabled: !!msgId ? true : false,
    }
  );
  function onBackClick() {
    setProfileClick(false);
  }

  if (isLoading || roomLoading) return <AnimationLoading />;
  return (
    <div>
      <div
        className={`all-messages hidden ${
          !msgClick && "mx-auto"
        } gap-2 w-full md:flex`}
      >
        <div className="w-[30%]">
          {data?.friends?.map((item, index) => (
            <div
              className="h-[70px] rounded-sm m-2  bg-black cursor-pointer flex items-center p-3 hover:scale-110 transform duration-500 ease-in-out"
              onClick={() => {
                setMsgClick(true);
                setUser(item);
                navigate(
                  `/messages/${data.filteredMessageIds[index].messageId}`
                );
              }}
              key={item}
            >
              <div className="pp rounded-full w-[50px] h-[50px]">
                <img
                  src={item.profileUrl}
                  alt="profilepic"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="ml-3">
                <div className="name">{item?.username}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`flex-2 ${profileClick ? "w-[40%]" : "w-full"} ${
            msgClick ? "block" : "hidden"
          } m-3 max-h-[80vh]`}
        >
          <MessageHeader setProfileClick={setProfileClick} user={user} />
          <MessagesChat chat={roomData} />
          <SendMessages />
        </div>
        <div
          className={`flex-2 ${profileClick ? "block" : "hidden"} w-[30%] p-3`}
        >
          <UserProfile handleBack={onBackClick} name={user.username} />
        </div>
      </div>
      <div className="block md:hidden">
        {!profileClick && !msgClick && (
          <div className="w-full">
            {data?.friends?.map((item, index) => (
              <div
                className="h-[70px] rounded-sm m-2  bg-black cursor-pointer flex items-center p-3 hover:scale-110 transform duration-500 ease-in-out"
                onClick={() => {
                  setMsgClick(true);
                  setUser(item);
                  navigate(`/messages?msgId=${item}`);
                }}
                key={item}
              >
                <div className="pp rounded-full w-[50px] h-[50px]">
                  <img
                    src={item.profileUrl}
                    alt="profilepic"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="name">{item.username}</div>
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
            <MessageHeader user={user} setProfileClick={setProfileClick} />
            <MessagesChat chat={roomData} />
            <SendMessages />
          </div>
        )}

        {msgClick && profileClick && (
          <div>
            <UserProfile handleBack={onBackClick} name={user.username} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMessages;
