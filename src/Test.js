import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser, clearAllUsers } from "./utils/slice";
import { useState } from "react";
import { clearForm } from "./utils/clearForm";

export const Test = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  function addProfile() {
    if (!userData.email || !userData.username) return;
    dispatch(addUser(userData));
    clearForm(userData, setUserData);
  }

  function removeProfile() {
    dispatch(removeUser({ username: userData.username }));
    clearForm(userData, setUserData);
  }

  function clearAllProfiles() {
    dispatch(clearAllUsers());
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.username} style={{ margin: "10px", padding: "10px" }}>
          {user.username} - {user.email}
        </div>
      ))}
      <div
        style={{
          width: "500px",
          margin: "auto",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          placeholder="enter username"
          value={userData.username}
          onChange={(e) =>
            setUserData({
              ...userData,
              username: e.target.value,
            })
          }
        />
        <input
          type="email"
          placeholder="Enter email"
          value={userData.email}
          onChange={(e) =>
            setUserData({
              ...userData,
              email: e.target.value,
            })
          }
        />
        <button onClick={addProfile} type="submit">
          Add User
        </button>
        <button onClick={removeProfile}>Remove User</button>
        <button onClick={clearAllProfiles}>Clear Users</button>
      </div>
    </div>
  );
};

export default Test;
