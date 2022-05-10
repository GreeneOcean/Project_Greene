import React, {useState, useEffect} from "react";

function Chat ({socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if(currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  }

  useEffect(()=>{
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    })
  }, [socket])
  return (
    <div>
      <div className="chat-header">
      <p>Live Chat</p>
      </div>
      <div className="chat-body">
       {messageList.map((messageContent)=>{
         return <h1>{messageContent.message}</h1>
       })}
      </div>
      <div className="chat-footer">
      <input type="text" value={currentMessage} placeholder="hey...." onChange={(event)=>{
        setCurrentMessage(event.target.value);
      }} onKeyPress={(event)=>{event.key === "Enter" && sendMessage()} }></input>
      <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;