import React, { useState } from 'react';
import ApprovalList from './ApprovalList.js';
import api from '../../api/index';

function Admin({ user }) {
  const [handleApprovalList, setHandleApprovalList] = useState(false);



  return (
    <div>

      <button onClick={() => {setHandleApprovalList(true)}}>Waiting for approval</button>

      {handleApprovalList &&

      user.pendingList.map((each) => {
        return <ApprovalList api={api.put} each={each}/>
      })
     }

    </div>
  )
}

export default Admin;
