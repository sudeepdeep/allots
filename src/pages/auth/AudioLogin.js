import React, { useEffect, useState } from "react";
import "./Star.css";
import TextField from "../../components/TextField";
import { AnimationLoading } from "../../components/Loading";
import audio from "../../assets/audio.json";
import {
  CorrectIcon,
  ShowOffIcon,
  ShowOnIcon,
  WrongIcon,
} from "../../assets/Icons";
import axios, { axiosErrorToast } from "../../utils/axios";
import Cookies from "js-cookie";
import Logo from "../../components/Logo";

function handleString(str) {
  return str[0].replace(/\s+/g, "");
}

function usernameText(speech, setUsername) {
  console.log(speech);
  window.SpeechRecognition = window.webkitSpeechRecognition;

  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    setUsername(handleString(transcript));
  });
  recognition.addEventListener("end", () => {
    recognition.stop();
  });
  if (speech === true) {
    recognition.start();
  }
}

function passwordText(speech, setPassword) {
  window.SpeechRecognition = window.webkitSpeechRecognition;
  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    setPassword(handleString(transcript));
  });
  recognition.addEventListener("end", () => {
    recognition.stop();
  });
  if (speech === true) {
    recognition.start();
  }
}

function AudioLogin() {
  const [username, setUsername] = useState("");
  const [speech, setSpeech] = useState(true);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [retry, setRetry] = useState(false);
  const [userAvailable, setUserAvailable] = useState(null);

  useEffect(() => {
    usernameText(speech, setUsername);
  }, []);

  useEffect(() => {
    if (userAvailable === true && speech === false) {
      passwordText(true, setPassword);
    }
  }, [userAvailable]);

  function handleTextChange(e) {
    setUsername(e);
  }

  function handleCheckUserExists(username) {
    axios.get(`user/${username}/check-username`).then((res) => {
      if (res.data.success === "true") {
        setUserAvailable(false);
      } else {
        setUserAvailable(true);
      }
    });
  }

  function handleLogin() {
    setLoading(true);
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        setLoading(false);
        if (res.data.access_token) {
          Cookies.set("token", res.data.access_token);
          Cookies.set("userId", res.data.userId);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }

  useEffect(() => {
    if (username.length > 5 && !password) {
      setSpeech(false);
      handleCheckUserExists(username);
    }
    if (username.length > 5 && password.length >= 5) {
      handleLogin();
    }
  }, [username, password]);

  return (
    <div className="w-full h-screen bg-[#040D21] text-white flex flex-col gap-2 items-center relative overflow-hidden">
      <div className="absolute w-[200px] h-[200px] rounded-full bg-[#042B66] top-[-60px] left-[-60px] blur-box"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#042B66] top-[-100px] right-[-200px] blur-box"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#481F49] bottom-[-100px] right-[-200px] blur-box"></div>
      <div className="absolute top-[20%] text-center">
        <Logo />
        <AnimationLoading animation={audio} autoplay={true} />
        {userAvailable === true ? (
          <>
            <span className="text-slate-400">your username:</span>{" "}
            {!!username && username}
            <div className="flex md:flex-row flex-col items-center md:gap-3 mt-2">
              Say your password *
              <TextField
                name="password"
                type="password"
                onChange={(e) => setPassword(e)}
                onIcon={<ShowOnIcon />}
                offIcon={<ShowOffIcon />}
                value={password}
                sx={"bg-transparent md:w-[400px]"}
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => passwordText(true, setPassword)}
              title="retry"
            >
              ⟲
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="flex md:flex-row flex-col items-center md:gap-3">
                Say your username *
                <div className="flex items-center gap-2">
                  <TextField
                    sx={"bg-transparent md:w-[400px]"}
                    onChange={handleTextChange}
                    value={username}
                  />
                  {userAvailable === true ? (
                    <div title={"username found"}>
                      <CorrectIcon />
                    </div>
                  ) : (
                    userAvailable === false && (
                      <div title={"username not found"}>
                        <WrongIcon />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => window.location.reload()}
                title="retry"
              >
                ⟲
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-2 items-center text-slate-500 absolute bottom-6">
        Supports in{" "}
        <img
          className="w-[18px] h-[18px]"
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png"
          alt="chrome"
        />
      </div>
    </div>
  );
}

export default AudioLogin;
