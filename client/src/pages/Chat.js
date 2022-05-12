import React, { useState, useEffect } from "react";
<<<<<<< HEAD:client/src/pages/Chat.js
import VideoPlayer from "../components/VideoPlayer";
=======
import styled from "styled-components";
import VideoPlayer from "./Dashboard/VideoPlayer";
>>>>>>> ba1f3cb1c0c0195c11d944864b2e17ad61eb9f66:client/src/Chat/Chat.js

function Chat({ socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      };

      socket.emit("send_message", messageData, (res) => {
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      });
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <ChatContainer>

      <div>
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          {messageList.map((messageContent) => {
            return <h1>{messageContent.message}</h1>;
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="hey...."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          ></input>
          <button onClick={sendMessage}>Send</button>
          <VideoPlayer socket={socket} />
        </div>
      </div>
    </ChatContainer>

  );
}

const ChatContainer = styled.nav`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  background: #37782c;
  position: fixed;
  bottom: 0;
`;

export default Chat;
