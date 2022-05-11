import React, { useEffect, useRef } from "react";
// import io from "socket.io-client";

// const socket = io("/webRTCPeers", {
//   path: "/"
// });

const VideoPlayer = ({ socket }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();

  useEffect(() => {
    socket.on("connection-success", (success) => {
      console.log("🥶", success);
    });

    const constraints = {
      audio: false,
      video: true
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          _pc.addTrack(track, stream);
        });
      })
      .catch((e) => {
        console.log("getUserMedica error", e);
      });
    const _pc = new RTCPeerConnection(null);
    _pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
      }
    };

    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    _pc.ontrack = (e) => {
      // we get remote stream.....
      remoteVideoRef.current.srcObject = e.streams[0];
    };
    pc.current = _pc;
  }, [socket]);

  const createOffer = () => {
    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      })
      .then((sdp) => {
        console.log("💀", JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
        socket.emit("sdp", sdp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setRemoteDescription = () => {
    const sdp = JSON.parse(textRef.current.value);
    console.log(sdp);
    pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  const addCandidate = () => {
    const candidate = JSON.parse(textRef.current.value);
    console.log("adding candidate");
    pc.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  return (
    <div style={{ margin: 10 }}>
      <br />
      <video
        style={{ width: 240, height: 240, margin: 5, backgroundColor: "black" }}
        ref={localVideoRef}
        autoPlay
      ></video>
      <video
        style={{ width: 240, height: 240, margin: 5, backgroundColor: "black" }}
        ref={remoteVideoRef}
        autoPlay
      ></video>
      <br />
      <button onClick={createOffer}>Create offer</button>
      <br />
      <button onClick={createAnswer}>Create Answer</button>
      <br />
      <textarea ref={textRef}></textarea>
      <br />
      <button onClick={setRemoteDescription}>Set Remote description</button>
      <br />
      <button onClick={addCandidate}>Add candidates</button>
    </div>
  );
};

export default VideoPlayer;
