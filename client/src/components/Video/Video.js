
import React, { useState, useEffect, useRef, useContext } from "react";
import styled, { keyframes, css } from 'styled-components'
import { DispatchContext } from '../../appState/index'

const VideoPlayer = ({ socket, user }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef();
  const [ , dispatch] = useContext(DispatchContext)


  const [offerVisible, setOfferVisible] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [status, setStatus] = useState("Available");
  const { user_name, otherUser } = user


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

  const closeVideo = () => {
    dispatch({ type: 'TOGGLE_VIDEO_CHAT' })
  }
  const sideValue = 400
  return (
    <Modal animate={!!otherUser.length}>
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
          {offerVisible && <FooterButton onClick={createOffer} > Call </FooterButton>}
          {answerVisible && <FooterButton onClick={createAnswer} > Answer </FooterButton>}
          <FooterButton onClick={closeVideo}>Close</FooterButton>
          <FooterButton>{status}</FooterButton>
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
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* height: 100vh;
  width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ animate }) => animate ? css`${chatSlideUp} ${fadeOptions}` : css`${chatSlideDown} ${fadeOptions}` };
  background: transparent;
  /* background-color: var(--color3); */
`


const VideoPlayerContainer = styled.div`
  height: 60vh;
  width: 75vw;
  background-color: black;
  /* background-color: var(--color3); */
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const VideoContainer = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  justify-content:  space-around;
  align-items: center;
`

const FooterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background-color: var(--color4); */
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: var(--color3);
  width: 100%;
  height: 15%;
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
  height: 40%;
  min-width: 5em;
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