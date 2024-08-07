import React, { useState } from "react";
import Members from "./Members";
import Message from "./Message";
import "../Chat/chat.css";
export default function Chat() {
  const [selectedMember, setSelectedMember] = useState("");
  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  return (
    <div>
      <div className="chat">
        <Members onSelectMember={handleSelectMember}></Members>
        <Message selectedMember={selectedMember}></Message>
      </div>
    </div>
  );
}
