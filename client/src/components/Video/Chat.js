import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './Dashboard/VideoPlayer';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:8080');
const socket = io.connect('https://nealtest.herokuapp.com/');
import styled, { css, keyframes } from 'styled-components';



function Chat({ socket,  currentUser, setOthe }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // for hiding and showing chat
  const [showVideo, setShowVideo] = useState(false);
  console.log("currentuser", currentUser);
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        name: currentUser,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      };
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  const initCall = () => {
    setShowVideo(true);
  };
  return (
    <ChatContainer animate={ !!otherUser.length } >
      {showVideo && <VideoPlayer socket={socket} showVideo={showVideo}  setShowVideo={setShowVideo} />}
      {/* <VideoPlayer socket={socket} showVideo={showVideo} setShowVideo={setShowVideo} /> */}
      <ChatBody>
      <ChatHeader>
        <p>{otherUser}</p>
      </ChatHeader>
        {messageList.map((messageContent, i) => {
          const { time, message } = messageContent
          const user = name === currentUser
          return (
            <MessageContainer side={user}  id={i}>
              <UserMessage user={user} >
              <p>{time}</p>
              <p>{message}</p>
              </UserMessage>
            </MessageContainer>
          );
        })}
      </ChatBody>
      <Footer >
        <ChatInput
          value={currentMessage}
          placeholder="hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <FooterButtonContainer>
          <FooterButton onClick={sendMessage}> Send </FooterButton>
          <FooterButton onClick={() => setShowVideo(true)}>Video Call</FooterButton>
          <FooterButton onClick={() => setOtherUser('')}>Close chat</FooterButton>
        </FooterButtonContainer>
      </Footer>
    </ChatContainer>
  );
}

const fadeTime = 300
const fadeOptions = `${fadeTime}ms ease-out forwards`

const chatSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`
const chatSlideDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`

const ChatContainer = styled.div`
  background: var(--color3);
  border-radius: 5px;
  position: sticky;
  left: 2vw;
  bottom: 1.5em;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  padding: 0.75em;
  padding-bottom: 0;
  width: 25vw;
  height: 33vh;
  min-height: 500px;
  max-width: 300px;
  opacity: 0;
  animation: ${({ animate }) => animate ? css`${chatSlideUp} ${fadeOptions}` : css`${chatSlideDown} ${fadeOptions}` };
`
const ChatHeader = styled.div`
  position: absolute;
  opacity: 0.55;
  top: 0.35em;
  font-size: 0.6em;
`

const ChatBody = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  height: 77%;
  display: flex;
  border-radius: 5px;
  padding-top: 1em;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`


const MessageContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  justify-content: ${({ side }) => css`flex-${side}`};
  background: transparent;
  color: white;
  width: 100%;
  padding: 0.1em;
`


const UserMessage = styled.div`
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  font-size: 0.725em;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ user }) => user ? css`var(--color3)` : css`var(--color2)`} ;
  opacity: 0.8;
  color: white;
  padding: 0.3em;
  animation: ${css`${chatSlideUp} ${fadeOptions}`};
`


const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-around;
  flex-direction: column;
  padding-top: 1.75vh;
  width: 100%;
  height: 20%;
`


const FooterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* background-color: var(--color4); */
  width: 100%;
  height: 100%;
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

const ChatInput = styled.input`
  width: 100%;
  height: 4em;
  padding-left: 0.5em;
  border-radius: 5px;
`

export default Chat;