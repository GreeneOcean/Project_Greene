// import React, { useContext, useState } from "react";
// import { SocketContext } from "../../../appState/index";

// const Options = ({ children }) => {
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
//     useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState("");

//   return (
//     <div>
//       <form>
//         <h6>Accout Info</h6>
//         <textarea
//           lable="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         ></textarea>
//         <button>copy your id</button>
//         <h6>Make a call</h6>
//         <textarea
//           lable="ID to call"
//           value={idToCall}
//           onChange={(e) => setIdToCall(e.target.value)}
//         ></textarea>
//         {callAccepted && !callEnded ? (
//           <button onClick={leaveCall}>Hang up</button>
//         ) : (
//           <button
//             onClick={() => {
//               callUser(idToCall);
//             }}
//           >
//             Call
//           </button>
//         )}
//       </form>
//       Options Page
//       {children}
//     </div>
//   );
// };

// export default Options;
