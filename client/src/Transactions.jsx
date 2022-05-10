

  import React, {useEffect, useState} from "react";
  import Cell from './Cell.jsx'

  // donations: {
  //   id SERIAL PRIMARY KEY NOT NULL,
  //   posted_by INT NOT NULL,
  //   taken_by INT,
  //   pictures TEXT[],
  //   tag TEXT[],
  //   title TEXT NOT NULL,
  //   category TEXT NOT NULL,
  //   description TEXT NOT NULL,
  //   approved_user INT,
  //   charity_only BOOL DEFAULT false,
  //   interested_users TEXT[],
  //   state TEXT DEFAULT 'unclaimed'
  // }

  // IAN's SUGGESTION?
  // -- last_name TEXT NOT NULL,
  // -- user_name TEXT NOT NULL,
  // -- first_name TEXT NOT NULL,
  // -- charity_state TEXT DEFAULT 'false'
  // -- interests INT[],
  // -- received  INT[],
  // -- donations INT[],
  // -- donated INT[],

  // I: 

  const Transactions = () =>{
    const [group, setGroup] = useState('');
    const [status, setStatus] = useState('');
    const [items, setItems] = useState(['item1', 'item2', 'item3']);
    const []




    return (
        <div>
          <div>
            <button onClick={() => setGroup('Both')}>Both</button>
            <button onClick={() => setGroup('Received')}>Received</button>
            <button onClick={() => setGroup('Donations')}>Donations</button>
          </div>
          <div>
            <button onClick={() => setStatus('Pending')}>Pending</button>
            <button onClick={() => setStatus('Claimed')}>Claimed</button>
            <button onClick={() => setStatus('Unclaimed')}>Unclaimed</button>
            <button onClick={() => setStatus('History')}>History</button>
          </div>
          <div>
            <Cell />
          </div>

        </div>

    )
  }

  export default Transactions;

  // var both = {

  // }

  // var received. = [users.]

  // var donations = {

  // }

  // var users = {
  //   id: 0,
  //   interests: [],
  //   received: [],
  //   donations: [],
  //   donated: [],
  //   rating: 0,
  //   last_name: '',
  //   user_name: '',
  //   first_name: '',
  //   is_charity: false
  // }


  // var donations = {
  //   id: 0,
  //   posted_by: 0,
  //   pictures: [],
  //   tag: [],
  //   title: '',
  //   category: '',
  //   description: '',
  //   approved: false,
  //   charity_only: false,
  //   interested: []
  // }


  // var donated = {
  //   id: 0,
  //   posted_by: 0,
  //   pictures: [],
  //   tag: [],
  //   title: '',
  //   category: '',
  //   description: '',
  //   approved: false,
  //   charity_only: false,
  //   claimed_by: 0
  // }

