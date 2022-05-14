import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from 'styled-components'

const Video = ({ socket }) => {
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
  const sideValue = 500
  return (
    <Modal animate={showVideo}>
      <VideoPlayerContainer >
        <VideoContainer>
          <video
            style={{ width: sideValue, height: sideValue, backgroundColor: "black" }}
            ref={localVideoRef}
            autoPlay
          />
          <video
            style={{ width: sideValue, height: sideValue, backgroundColor: "black" }}
            ref={remoteVideoRef}
          />
        </VideoContainer>
        <FooterButtonContainer>
          {showHideButtons()}
          <FooterButton onClick={() => setShowVideo(false)}>Close</FooterButton>
          <StatusTag>{status}</StatusTag>
        </FooterButtonContainer>
      </VideoPlayerContainer>
    </Modal>
  );
};

export default VideoPlayer;


const fadeTime = 300
const fadeOptions = `${fadeTime}ms ease-out forwards`

const chatSlideUp = keyframes`
  0% {
    opacity: 0;
    /* transform: translateY(100%); */
  }
  100% {
    opacity: 1;
    /* transform: translateY(0%); */
  }
`
const chatSlideDown = keyframes`
  0% {
    opacity: 1;
    /* transform: translateY(0%); */
  }
  100% {
    opacity: 0;
    /* transform: translateY(100%); */
  }
`



const Modal = styled.div`
  position: relative;
  /* right: 0; */
  top: -45vh;
  height: 100vh;
  width: 100vw;
  /* height: 1000px; */
  /* width: 1000px; */
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ animate }) => animate ? css`${chatSlideUp} ${fadeOptions}` : css`${chatSlideDown} ${fadeOptions}` };
  /* background: transparent; */
  background-color: var(--color3);
  opacity: 0.9;
`


const VideoPlayerContainer = styled.div`
  height: 50vh;
  width: 50vw;
  background-color: var(--color3);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const VideoContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content:  space-around;
  align-items: center;
`

const FooterButtonContainer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  /* background-color: var(--color4); */
  width: 100%;
  height: 20%;
`

const FooterButton = styled.button`
  display: flex;
  font-size: 16px;
  color: white;
  padding: .2em;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: transparent;
  border: white 0.5px solid;
  height: 60%;

  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const StatusTag = styled.div`
  display: flex;
  font-size: 16px;
  color: white;
  padding: .2em;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: transparent;
  border: white 0.5px solid;
  height: 60%;

  &:hover{
    background-color: rgba(255, 255, 255, 0.2);
  }

`