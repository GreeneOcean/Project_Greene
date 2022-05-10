import React, { useState } from 'react';


function ApprovalList() {
  const [userApproved, setUserApproved] = useState(false);
  const [userDenied, setUserDenied] = useState(false);

  const handleApproved = (value) => {
    // userApproved ||
    //   fetch(`/userApproved`, {
    //     method: 'PUT',
    //     body: JSON.stringify({content}),
    //     headers: {"Content-Type": "application/json"}
    //     })
    //     .then(() => setUserApproved(true))
    //     .catch(err => console.log(err, 'err PUT approved'));
    if (value) {
      console.log('hit')
      setUserApproved(true)
    }
  };

  // const handleDeny = () => {
  //   userDeny ||
  //     fetch(`/userDenied`, {
  //       method: 'PUT',
  //       body: JSON.stringify({content}),
  //       headers: {"Content-Type": "application/json"}
  //       })
  //       .then(() => setUserDenied(true))
  //       .catch(err => console.log(err, 'err PUT deny'));
  // };

  return (
    <div>
      <p>Users waiting for approval</p>
      <label>
        {userApproved ? ('Approved') : (<button onClick={() => handleApproved(true)}>Approve</button>)}

      </label>
      <label>
        {userDenied ? ('Denied') : (<button onClick={() => handleApproved(false)}>Deny</button>)}

      </label>

    </div>
  )
}

export default ApprovalList;

