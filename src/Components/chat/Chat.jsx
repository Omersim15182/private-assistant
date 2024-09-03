import React, { useEffect, useState } from "react";
import Message from "./Components/Message";
import axios from "axios";
import Members from "./Components/Members";

export default function Chat() {
  const [selectedMember, setSelectedMember] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [users, setUsers] = useState([]);

  //select member to chat with them
  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  //get all contacts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3500/Contacts/retrieveContacts",
          { withCredentials: true }
        );
        setUsers(response.data.map((contact) => ({ ...contact })));
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }
    }
    fetchData();
  }, []);

  //Fetch data of user who login
  useEffect(() => {
    const fetchUserLogin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/landingPage/login/userlogin",
          {
            withCredentials: true,
          }
        );
        setUserLogin(response.data);
      } catch (error) {
        console.error("Error fetching user login:", error);
      }
    };

    fetchUserLogin();
  }, []);

  console.log("users", users);

  //debug
  return (
    <div>
      <div className="chat">
        <Members
          allUsers={users}
          userLogin={userLogin}
          onSelectMember={handleSelectMember}
          selectedMember={selectedMember}
        />
        <Message
          selectedMember={selectedMember}
          userLogin={userLogin}
        ></Message>
      </div>
    </div>
  );
}
