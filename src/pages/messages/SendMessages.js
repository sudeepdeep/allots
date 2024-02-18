import React from "react";
import TextField from "../../components/TextField";
import { useState } from "react";
import { MessageIcon } from "../../assets/Icons";

function SendMessages() {
  const [message, setMessage] = useState("");
  function handleTextChange(e) {
    setMessage(e);
  }
  return (
    <div className="h-[6vh] flex gap-2 m-3 items-center justify-center">
      <div className="w-[500px]">
        <TextField onChange={handleTextChange} value={message} />
      </div>
      <MessageIcon />
    </div>
  );
}

export default SendMessages;
