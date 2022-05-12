import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./Dashboard/VideoPlayer";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // for hiding and showing chat
  const [showVideo, setShowVideo] = useState(false);
  const [offerVisible, setOfferVisible] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [status, setStatus] = useState("Make a call now");
  const pc = useRef(new RTCPeerConnection(null));

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
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

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent, i) => {
          return (
            <div className="message" id={i}>
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                </div>
              </div>
            </div>
          );
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

        <button onClick={sendMessage}>&#9658;</button>
        <br />
        {/* <button onClick={() => setShowVideo(true)}>Video Call</button> */}

        <VideoPlayer socket={socket} />
      </div>
    </div>
  );
}

// const ChatContainer = styled.nav`
//   box-sizing: border-box;
//   margin: 0;
//   padding: 0;
//   height: 60px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 1.2rem;
//   background: #37782c;
//   position: fixed;
//   bottom: 0;
// `;

export default Chat;
