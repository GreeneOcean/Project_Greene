
import React, {useState}from "react";
import io from "socket.io-client";
import Chat from "./Chat/Chat";

const socket =io.connect ("http://localhost:8080");

const App = () =>{

    return (
        <div className="App">

        <Chat socket={socket} />

        </div>
    )
}

export default App