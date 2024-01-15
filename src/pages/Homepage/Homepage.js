import React, { useEffect, useState } from "react";
import style from "./Homepage.module.css";
import { dummyData } from "../../utils";
import UsersList from "../../components/usersList/UsersList";
import UserChip from "../../components/userChip/UserChip";

function Homepage() {
  /* States */
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [filterdUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userAdded, setUserAdded] = useState(false);
  const [backspacePressed, setBackspacePressed] = useState(false);

  /* Set Users */
  useEffect(() => {
    setUsers(dummyData);
  }, []);

  /* Create user list to show based on conditions */
  const userListHandler = () => {
    const usersList = users.filter(
      (user) =>
        !selectedUsers.some(
          (selectedUser) => selectedUser.email == user.email
        ) &&
        (input === "" || user.name.toLowerCase().includes(input.toLowerCase()))
    );
    if (!userAdded) setFilteredUsers(usersList);
    setUserAdded(false);
  };
  useEffect(userListHandler, [input, selectedUsers]);

  /* Remove last chip after 2 backspace */
  const onInputHandler = (e) => {
    if (input === "" && e.code === "Backspace") {
      if (backspacePressed === false) setBackspacePressed(true);
      else {
        selectedUsers.pop();
        setSelectedUsers([...selectedUsers]);
        setBackspacePressed(false);
      }
    } else setBackspacePressed(false);
  };

  return (
    <div class={style.wrapper}>
      <div className={style.selectedUser}>
        {/* Chips */}
        {selectedUsers.map((user, idx) => (
          <UserChip
            user={user}
            setSelectedUsers={setSelectedUsers}
            selectedUsers={selectedUsers}
            setUserAdded={setUserAdded}
            isLastChip={idx === selectedUsers.length - 1}
            backspacePressed={backspacePressed}
          />
        ))}

        {/* input div */}
        <input
          className={style.input}
          onKeyDown={(e) => onInputHandler(e)}
          onInput={(e) => setInput(e.target.value)}
          onFocus={userListHandler}
          placeholder="Enter Name"
          value={input}
        />
      </div>
      {/* Users list */}
      <UsersList
        users={filterdUsers}
        setSelectedUsers={setSelectedUsers}
        selectedUsers={selectedUsers}
        setFilteredUsers={setFilteredUsers}
        setInput={setInput}
        userAdded={userAdded}
        setUserAdded={setUserAdded}
        setBackspacePressed={setBackspacePressed}
      />
    </div>
  );
}

export default Homepage;
