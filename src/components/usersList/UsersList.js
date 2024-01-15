import React from "react";
import style from "./UsersList.module.css";

function UsersList({
  users,
  setSelectedUsers,
  selectedUsers,
  setFilteredUsers,
  setInput,
  userAdded,
  setUserAdded,
  setBackspacePressed,
}) {
  const onClickHandler = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setFilteredUsers([]);
    setInput("");
    setUserAdded(true);
    setBackspacePressed(false);
  };

  if (users.length === 0 || userAdded) return;

  return (
    <div className={style.wrapper}>
      {users.map((user) => {
        return (
          <div
            className={style.user}
            key={user.email}
            onClick={() => onClickHandler(user)}
          >
            <div className={style.profilePicture}>
              <img src={`${user.profilePicture}`} />
            </div>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
