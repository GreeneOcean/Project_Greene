import React, { useState } from 'react';
import ApprovalList from './ApprovalList.js';


function Admin({ user }) {
  const [handleApprovalList, setHandleApprovalList] = useState(false);
  console.log('Admin state', user)

  return (
    <div>

      <button onClick={() => {setHandleApprovalList(true)}}>Waiting for approval</button>

      {handleApprovalList &&

      user.pendingList.map((each) => {
        <ApprovalList each={each}/>
      })
     }

    </div>
  )
}

export default Admin;
