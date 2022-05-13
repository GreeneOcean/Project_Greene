import React, { useEffect, useState } from "react";
import Cell from './Cell.jsx'
import styled from 'styled-components';
import Chat from '../Chat/Chat';
import { ButtonL, ButtonM, ButtonS } from '../../styles/buttons';

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
        <StyledDropdown>
          <select onChange={(e) => setGroup(e.target.value)}>
            <option type="radio" value='both'>All</option>
            <option type="radio" value='received'>Received</option>
            <option type="radio" value='donations'>Donations</option>
          </select>
        </StyledDropdown>
        {/* <div>
          <PlaceholderButton onClick={() => setGroup('both')}>Both</PlaceholderButton>
          <PlaceholderButton onClick={() => setGroup('received')}>Received</PlaceholderButton>
          <PlaceholderButton onClick={() => setGroup('donations')}>Donations</PlaceholderButton>
        </div> */}
        <div>
          <ButtonM onClick={() => setStatus('approved')}>Pending</ButtonM>
          <ButtonM onClick={() => setStatus('claimed')}>Claimed</ButtonM>
          <ButtonM onClick={() => setStatus('unclaimed')}>Unclaimed</ButtonM>
          <ButtonM onClick={() => setStatus('donated')}>History</ButtonM>
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
        { !!otherUser.length && <Chat currentUser={user.user_name} otherUser={otherUser}/> }
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
display: flex;
padding-top: 4em;
/* align-items: center;
font: 40px;
justify-content: center; */
font-size: 20px;
flex-direction: column;
background-color: white;
`;

const StyledDropdown = styled.div`
  margin: 1em 0;

  *{
    width:10em;
    height: 3em;
    border-radius:6px;
    font-size: 0.8em;
    padding: 0 1em;
  }
`;

export default UserTransactions;