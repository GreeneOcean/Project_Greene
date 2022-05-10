
import React, {useState}from "react";
import io from "socket.io-client";
import Chat from "./Chat/Chat";

const socket =io.connect ("http://localhost:8080");

const App = () =>{
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if(username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };
    return (
        <div className="App">
        {!showChat?
        (<div className="joinChatContainer">
        <h3>Join A chat </h3>
        <input type="text" placeholder="okook...." onChange={(event)=>{
            setUsername(event.target.value)
        }}></input>
        <input type="text" placeholder="room...." onChange={(event)=>{
            setRoom(event.target.value)
        }}></input>
        <button onClick={joinRoom}>Join a room</button>
        </div>)
        : (
        <Chat socket={socket} username={username} room={room}/>
        )}
        </div>
    )
}

export default App