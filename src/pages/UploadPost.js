import React, { useEffect, useState } from "react";
import { UploadPhoto } from "../components/UploadPhoto";
import uploadLoad from "../assets/uploadLoading.json";
import { ComboButton } from "../components/ComboButton";
import Success from "../components/Success";
import TextField from "../components/TextField";
import Select from "../components/Select";
import Cookies from "js-cookie";
import { useLocation } from "../utils/useLocation";
import { useValidUser } from "../utils/useValidUser";
import axios, { axiosErrorToast } from "../utils/axios";
import { sectionOptions } from "./Home";
import AlertDialog from "../components/AlertDialog";
import { AnimationLoading } from "../components/Loading";

const tips = [
  "Login to get verified & to keep track of your articles",
  "Login to like, comment, share the posts.",
];

function UploadPost() {
  const user = useValidUser();
  const [showDialog, setShowDialog] = useState(false);
  const [randomTip, setRandomTip] = useState("");
  const [uploadUi, setUploadUi] = useState(true);
  const [form, setForm] = useState({
    title: null,
    abstract: null,
    description: null,
    coverUrl: null,
    username: user.name,
    section: sectionOptions[0].value,
  });
  useEffect(() => {
    const getRandomIndex = () => Math.floor(Math.random() * tips.length);
    setRandomTip(tips[getRandomIndex()]);
    const uploadLoading = setTimeout(() => {
      setUploadUi(false);
    }, 3050);

    return () => clearTimeout(uploadLoading);
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      username: user.name,
    });
  }, [user.name]);

  const [success, setSuccess] = useState(false);
  const locs = useLocation();

  function handleSubmit() {
    axios
      .post("/article", {
        ...form,
        latitude: locs.latitude,
        longitude: locs.longitude,
        username: user.name,
        userType: user.name !== "anonymous" ? "verified" : "not-verified",
        coordinates: [locs.longitude, locs.latitude],
      })
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => axiosErrorToast(err));
  }

  if (showDialog)
    return (
      <AlertDialog
        title="Are you sure you want to post?"
        handleSubmit={handleSubmit}
        setDilog={setShowDialog}
      />
    );
  async function handleUploadFunction() {
    setShowDialog(true);
  }

  if (success) return <Success />;

  if (uploadUi)
    return (
      <div className="w-full flex flex-col h-[70vh] items-center justify-center">
        <AnimationLoading animation={uploadLoad} />
        <span className="opacity-75 text-center">Tip: {randomTip}</span>
      </div>
    );
  return (
    <div className="max-w-xl mx-auto font-bold text-2xl">
      <h3>Add Article</h3>
      <div className="flex flex-col mt-4">
        <Select
          onChange={(e) => {
            console.log(e);
            setForm({
              ...form,
              section: e,
            });
          }}
          options={sectionOptions}
          title={"Section"}
          value={form.section}
        />

        <TextField
          title="Title for the article."
          onChange={(e) => {
            setForm({
              ...form,
              title: e,
            });
          }}
          value={form.title}
          name="title"
        />
        <TextField
          title=" Abstract for the article."
          onChange={(e) => {
            setForm({
              ...form,
              abstract: e,
            });
          }}
          name="abstract"
          subtitle="Keep it brief and simple."
          rows={3}
          value={form.abstract}
        />
        <TextField
          title=" Description for the article."
          onChange={(e) => {
            setForm({
              ...form,
              description: e,
            });
          }}
          name="description"
          subtitle="Make sure the above info is correct"
          rows={3}
          value={form.description}
        />
      </div>
      <UploadPhoto
        title={"Upload Cover Photo"}
        handleChange={(e) => {
          setForm({
            ...form,
            coverUrl: e,
          });
        }}
      />
      <ComboButton
        title={Cookies.get("userId") ? "Post" : "Post as anonymous"}
        onClick={handleUploadFunction}
      />
    </div>
  );
}

export default UploadPost;
