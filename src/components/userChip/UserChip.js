import React from "react";
import style from "./UserChip.module.css";
function UserChip({
  user,
  setSelectedUsers,
  selectedUsers,
  setUserAdded,
  backspacePressed,
  isLastChip,
}) {
  const onClickHandler = () => {
    const users = selectedUsers.filter(
      (selectedUser) => selectedUser.email != user.email
    );
    setSelectedUsers(users);
    setUserAdded(true);
  };

  return (
    <div
      className={style.user}
      key={user.email}
      style={{
        backgroundColor:
          isLastChip && backspacePressed ? "#ab9595" : "gainsboro",
      }}
    >
      <div className={style.profilePicture}>
        <img src={`${user.profilePicture}`} />
      </div>
      <div>{user.name}</div>
      <div onClick={onClickHandler}>X</div>
    </div>
  );
}

export default UserChip;
