import React, { useEffect, useRef } from "react";
import { Peer } from "peerjs";
import "./chat.css";
import { Button } from "@mui/material";

export default function Call({ userLogin, selectedMember }) {
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    peerInstance.current = new Peer(userLogin.id);

    const peer = peerInstance.current;

    peer.on("open", () => {
      console.log("Peer connection opened");
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);

          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current
                .play()
                .catch((err) =>
                  console.error("Failed to play remote video", err)
                );
            }
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    });

    peer.on("error", (err) => {
      console.error("Peer connection error", err);
    });

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, [userLogin.id]);

  const handleCall = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = stream;
          currentUserVideoRef.current.play();
        }

        const call = peerInstance.current.call(selectedMember.id, stream);

        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current
              .play()
              .catch((err) => console.error("error", err));
          }
        });
      })
      .catch((err) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.pause();
        }
        console.error("Failed to get local stream", err);
      });
  };

  return (
    <div>
      <Button onClick={handleCall}>Call</Button>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <div>
        <video ref={currentUserVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
}
