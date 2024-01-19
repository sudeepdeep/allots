import Cookies from "js-cookie";

export const useValidUser = () => {
  const user = Cookies.get("userId");
  return user
    ? {
        status: true,
        name: user.username,
      }
    : {
        status: false,
        name: "anonymous",
      };
};
