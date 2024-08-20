import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

const socket = io("http://localhost:3500"); // Replace with your server URL

export default function Call() {
  const [peer] = useState(
    new Peer(undefined, {
      host: "localhost",
      port: 3500,
      path: "/myapp",
      secure: false,
    })
  );
  const [mediaStream, setMediaStream] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    // Get user media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaStream(stream);

        // Handle incoming calls
        peer.on("call", (incomingCall) => {
          incomingCall.answer(stream);
        });

        // Handle signaling through socket.io
        socket.on("signal", ({ signal, from }) => {
          peer.signal(signal);
        });
      })
      .catch((err) => console.error("Failed to get media stream", err));

    // Relay signaling data through socket.io
    peer.on("signal", (data) => {
      socket.emit("signal", {
        signal: data,
        to: "ff3600ad-6e38-485a-9fcf-fee25077a0b9", // Replace with the ID of the peer you want to connect to
      });
    });
  }, [peer]);

  const startCall = () => {
    if (mediaStream) {
      const call = peer.call(
        "ff3600ad-6e38-485a-9fcf-fee25077a0b9",
        mediaStream
      );
      setCall(call);
    } else {
      console.error("No media stream available");
    }
  };

  const answerCall = () => {
    if (call && mediaStream) {
      call.answer(mediaStream);
    } else {
      console.error("No call to answer or media stream is missing");
    }
  };

  return (
    <div>
      <button onClick={startCall}>Call</button>
      <button onClick={answerCall}>Answer</button>
    </div>
  );
}
