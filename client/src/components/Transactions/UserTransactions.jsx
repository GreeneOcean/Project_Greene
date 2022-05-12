import React, { useEffect, useState } from "react";
import Cell from './Cell.jsx'
import styled from 'styled-components';
import Chat from '../Chat/Chat';


const UserTransactions = ({ user }) =>{
  const [group, setGroup] = useState('both');
  const [status, setStatus] = useState('approved');
  const [items, setItems] = useState([]);
  const [otherUser, setOtherUser] = useState('')


  const setOther = (userName) => {
    setOtherUser(userName)
  }

  const clearOther = () => {
    setOtherUser('')
  }

  const filter = () => {

    var newItems = [];

    if (group === 'both') {
      user.interested.forEach(item => {
        if (item.state === status) {
          newItems.push(item);
        }
      });
      user.received.forEach(item => {
        if (item.state === status) {
          newItems.push(item);
        }
      });
      user.donated.forEach(item => {
        if (item.state === status) {
          newItems.push(item);
        }
      });
    } else if (group === 'received') {
      user.received.forEach(item => {
        if (item.state === status) {
          newItems.push(item);
        }
        });
    } else if (group === 'donations') {
      user.donated.forEach(item => {
        if (item.state === status) {
          newItems.push(item);
        }
      });
    }
    setItems(newItems)
  }

  useEffect(() => {
    user && filter();
  }, [group, status, user]);

  return (

      <TransactionContainer>
        <div>
          <PlaceholderButton onClick={() => setGroup('both')}>Both</PlaceholderButton>
          <PlaceholderButton onClick={() => setGroup('received')}>Received</PlaceholderButton>
          <PlaceholderButton onClick={() => setGroup('donations')}>Donations</PlaceholderButton>
        </div>
        <div>
          <PlaceholderButton onClick={() => setStatus('approved')}>Pending</PlaceholderButton>
          <PlaceholderButton onClick={() => setStatus('claimed')}>Claimed</PlaceholderButton>
          <PlaceholderButton onClick={() => setStatus('unclaimed')}>Unclaimed</PlaceholderButton>
          <PlaceholderButton onClick={() => setStatus('donated')}>History</PlaceholderButton>
        </div>
        <div>
          {
            items.map((item, i) => {
              return (
                <Cell
                  status={status}
                  group={group}
                  user={user}
                  item={item}
                  key={i}
                  setOther={setOther}
                  clearOther={clearOther}
                />
              )
            })
          }
        </div>
        <div>{otherUser}</div>
        { otherUser.length && <Chat currentUser={user.user_name} otherUser={otherUser}/> }
      </TransactionContainer>

  )
}


const PlaceholderButton = styled.button`
  padding: .5em;
  margin: .2em;
  font-size: 13px;
`

const TransactionContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
padding-top: 4em;
/* align-items: center;
font: 40px;
justify-content: center; */
font-size: 20px;
flex-direction: column;
background-color: grey;
`

export default UserTransactions;