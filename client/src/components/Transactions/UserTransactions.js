import React, { useEffect, useState, useContext } from "react";
import Cell from './Cell'
import FilterOptions from './FilterOptions'
import styled from 'styled-components';
import { DispatchContext } from '../../appState/index'
import { ButtonL, ButtonM, ButtonS } from '../../styles/buttons';

//STATES
// -- unclaimed
// -- claimed
// -- approved
// -- donated

//GROUPS
// -- all
// -- interested
// -- received
// -- donations

const allFilters = [
  ['unclaimed', 'All donations'],
  ['claimed', 'All donations with interested users'],
  ['approved', 'All approved donations']
]

const interestedFilters = [
  // ['claimed', 'Donations Im interesed in'],
  ['approved', 'Donations I\'m approved for']
]

const receivedFilters = [
  // ['claimed', 'Donations I\'ve received'],
]

const donationsFilters = [
  ['unclaimed', 'My donations'],
  ['claimed', 'My donations with interested users'],
  ['approved', 'Donations I\'ve approved']
]

const filters = {
  all: allFilters,
  interested: interestedFilters,
  received: receivedFilters,
  donations: donationsFilters,
}

const UserTransactions = ({ user }) => {
  const [group, setGroup] = useState('all');
  const [itemFilter, setItemFilter] = useState(null);
  const [renderedItems, setRenderedItems] = useState([]);
  const [otherUser, setOtherUser] = useState("");
  const [donated, setDonated] = useState(user.donated || [])
  const [interested, setInterested] = useState(user.interested || [])
  const [received, setReceived] = useState(user.received || [])

  const setOther = (userName) => {
    setOtherUser(userName);
  };

  const clearOther = () => {
    setOtherUser("");
  };

  useEffect(() => {
    setDonated([ ...user.donated ] || [])
    setInterested([ ...user.interested ] || [])
    setReceived([ ...user.received ] || [])
  }, [user.donated, user.interested, user.received])


  useEffect(() => {
    let items = []

    if (group === 'all') {
      items = [ ...donated, ...interested, ...received ]
    }
    if (group === 'interested') {
      items = [  ...interested ]
    }
    if (group === 'received') {
      items = [  ...received ]
    }
    if (group === 'donations') {
      items = [ ...donated]
    }

    if (itemFilter) {
      items = items.filter(item => item.state === itemFilter)
    }
    setRenderedItems(items)
  }, [group, itemFilter, donated, interested, received]);


  const openChat = (newUserName) => {
    dispatch({
      type: 'TOGGLE_CHAT',
      payload: newUserName
    })
  }

  return (

      <TransactionContainer>
        <StyledDropdown>
          <select onChange={(e) => setGroup(e.target.value)}>
            <option type="radio" value='all'>All my transactions </option>
            <option type="radio" value='donations'>My Donations</option>
            <option type="radio" value='interested'>Donations Im interested in</option>
            <option type="radio" value='received'>Received Donations</option>
          </select>
        </StyledDropdown>

          <FilterOptions
            filters={filters[group]}
            setFilter={setItemFilter}
            itemFilter={itemFilter}
          />

        <ItemContainer>
          {
            renderedItems.map((item, i) => {
              return (
                <Cell
                  status={status}
                  group={group}
                  user={user}
                  item={item}
                  key={i}
                />
              )
            })

          }
        </ItemContainer>
      </TransactionContainer>

  )
}


const PlaceholderButton = styled.button`
  padding: 0.5em;
  margin: 0.2em;
  font-size: 13px;
`;

const TransactionContainer = styled.div`
width: 80vw;
display: flex;
padding-top: 4em;
position: relative;
font-size: 20px;
flex-direction: column;
`;

const ItemContainer = styled.div`
width: 100%;
display: flex;
padding-top: 4em;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const StyledDropdown = styled.div`
  margin: 1em 0;

  *{
    height: 3em;
    border-radius:6px;
    font-size: 0.8em;
    padding: 0 1em;
  }
`;

export default UserTransactions;
