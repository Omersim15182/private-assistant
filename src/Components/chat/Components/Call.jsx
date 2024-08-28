import React, { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import "../chat.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function Call({ userLogin, selectedMember }) {
  const videoRef = useRef(null); // Use a single ref for both videos
  const peerInstance = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initializePeer = async () => {
      try {
        peerInstance.current = new Peer(userLogin.id);
        const peer = peerInstance.current;

        peer.on("open", () => {
          console.log("Peer connection opened");
        });
        peer.on("call", async (call) => {
          console.log(call);

          const answerCall = confirm("Do you want to answer");
          if (answerCall) {
            setOpen(true);

            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
              });

              call.answer(stream);

              call.on("stream", (remoteStream) => {
                if (videoRef.current) {
                  videoRef.current.srcObject = remoteStream;
                  videoRef.current
                    .play()
                    .catch((err) =>
                      console.error("Failed to play remote video", err)
                    );
                }
              });
              call.on("close", () => {
                console.log("Call ended");
                setOpen(false);
              });
            } catch (err) {
              console.error("Error during the call handling", err);
            }
          } else {
            alert("Call denied");
            call.close();
            peer.destroy();
          }
        });

        peer.on("error", (err) => {
          console.error("Peer connection error", err);
        });
      } catch (err) {
        console.error("Error initializing PeerJS", err);
      }
    };

    initializePeer();

    return () => {
      peerInstance.current?.destroy();
    };
  }, [userLogin.id]);

  const handleCall = async () => {
    try {
      setOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current
          .play()
          .catch((err) =>
            console.error("Failed to play current user video", err)
          );
      }

      const call = peerInstance.current.call(selectedMember.id, stream);

      call.on("stream", (remoteStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = remoteStream;
          videoRef.current
            .play()
            .catch((err) => console.error("Failed to play remote video", err));
        }
      });
    } catch (e) {
      console.error("Failed to get local stream", e);
    }
  };

  return (
    <div>
      <Button onClick={handleCall}>Call</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Video Call</DialogTitle>
        <DialogContent dividers>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "80%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            End Call
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
