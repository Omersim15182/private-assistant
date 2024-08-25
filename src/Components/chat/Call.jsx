import { Button } from "@mui/material";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";

export default function Call({ userLogin, selectedMember }) {
  const [remotePeerId, setRemotePeerId] = useState("");
  const videoRef = useRef(null); // Ref for the video element
  const peerRef = useRef(null); // Ref for the Peer instance

  useEffect(() => {
    // Initialize Peer with userLogin.id
    peerRef.current = new Peer(userLogin.id);

    peerRef.current.on("open", (id) => {
      console.log("My peer ID is: " + id);
    });

    peerRef.current.on("call", async (call) => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        // Answer the call with the local media stream
        call.answer(mediaStream);

        call.on("stream", (remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.play();
          }
        });
      } catch (error) {
        console.error("Failed to get local stream", error);
      }
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [userLogin.id]); // Dependency array includes userLogin.id to recreate Peer if it changes

  const handleCall = async (e) => {
    e.preventDefault();
    setRemotePeerId(selectedMember.id);
    if (remotePeerId) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (peerRef.current) {
          const call = peerRef.current.call(remotePeerId, mediaStream);
          call.on("stream", (remoteStream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = remoteStream;
              videoRef.current.play();
            }
          });
        }
      } catch (error) {
        console.error("Failed to get local stream", error);
      }
    }
  };
  console.log(selectedMember.id);

  return (
    <div>
      <div className="call-chat">
        <Button
          onClick={(e) => handleCall(e)}
          className="call-button"
          type="submit"
        >
          Call
        </Button>
        <video ref={videoRef} className="remote-video" autoPlay></video>
      </div>
    </div>
  );
}
