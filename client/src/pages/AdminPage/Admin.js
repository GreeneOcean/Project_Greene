import React, { useState } from 'react';
import ApprovalList from './ApprovalList.js';


function Admin() {
  const [handleApprovalList, setHandleApprovalList] = useState(false);

  return (
    <div>

      <button onClick={() => {setHandleApprovalList(true)}}>Waiting for approval</button>
      {handleApprovalList && <ApprovalList/>}

    </div>
  )
}

export default Admin;
