import React, { useState } from 'react'
import Members from './Members'
import Message from './Message'

export default function Chat() {

  const [selectedMember,setSelectedMember] = useState('');
  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  return (
    <div>
      <div style={{display:'flex',flexDirection:'row',margin:'10px' }}>
        <Members onSelectMember={handleSelectMember}></Members>
        <Message selectedMember={selectedMember}></Message>
      </div>
    </div >
  )
}
