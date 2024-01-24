import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useValidUser = () => {
  const [status, setStatus] = useState({
    status: false,
    name: "anonymous",
  });
  const userStore = useSelector((store) => store.loggedInUser.userData);
  useEffect(() => {
    if (userStore.username) {
      setStatus({
        status: true,
        name: userStore.username,
      });
    }
  }, [userStore.username]);

  return status;
};
