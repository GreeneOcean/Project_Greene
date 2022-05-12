import React, { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ socket }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();

  const [offerVisible, setOfferVisible] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [status, setStatus] = useState("Make a call now");

  useEffect(() => {
    socket.on("sdp", (data) => {
      pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      if (data.sdp.type === "offer") {
        setOfferVisible(false);
        setAnswerVisible(true);
        setStatus("Incoming call....");
      } else {
        setStatus("call established");
      }
    });

    socket.on("candidate", (candidate) => {
      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
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
        socket.emit("candidate", e.candidate);
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
        pc.current.setLocalDescription(sdp);
        socket.emit("sdp", { sdp });
        setOfferVisible(false);
        setStatus("calling...");
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
        pc.current.setLocalDescription(sdp);
        socket.emit("sdp", { sdp });
        setAnswerVisible(false);
        setStatus("Call established");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showHideButtons = () => {
    if (offerVisible) {
      return (
        <div>
          <button onClick={createOffer}>Call</button>
        </div>
      );
    }
    if (answerVisible) {
      return (
        <div>
          <button onClick={createAnswer}>Answer</button>
        </div>
      );
    }
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

      {showHideButtons()}
      <div>{status}</div>
      <button
        onClick={() => {
          socket.disconnect;
        }}
      >
        Hang up
      </button>
      {/* <textarea ref={textRef}></textarea> */}
      <br />
    </div>
  );
};

export default VideoPlayer;
