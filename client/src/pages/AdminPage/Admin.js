import React, { useState } from 'react';
import ApprovalList from './ApprovalList.js';


function Admin({ state, dispatch }) {
  const [handleApprovalList, setHandleApprovalList] = useState(false);
  console.log('Admin state', state)

  return (
    <div>

      <button onClick={() => {setHandleApprovalList(true)}}>Waiting for approval</button>

      {handleApprovalList &&

      state.pendingList.map((user) => {
        <ApprovalList user={user}/>
      })
     }

    </div>
  )
}

export default Admin;
