import React from 'react'
import Members from './Members'
import Message from './Message'

export default function Chat() {
  return (
    <div>
      <div style={{display:'flex',flexDirection:'row',margin:'10px' }}>
        <Members></Members>
        <Message></Message>
      </div>
    </div >
  )
}
