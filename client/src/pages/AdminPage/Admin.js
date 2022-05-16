import React, { useState } from 'react';
import ApprovalList from './ApprovalList.js';
import api from '../../api/index';
import styled from "styled-components";
import { ButtonM } from '../../styles/buttons';

function Admin({ user }) {
  const [handleApprovalList, setHandleApprovalList] = useState(false);

  return (
    <AdminContainer>
      <ShowListButton onClick={() => {setHandleApprovalList(true)}}>Waiting for approval</ShowListButton>
      {handleApprovalList && user.pendingList.map((each) => {
        return <ApprovalList api={api.put} each={each}/>
      })}
    </AdminContainer>
  )
}

export default Admin;

const AdminContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4em;
  position: relative;
  align-items: center;
  justify-content: space-around;
  font-size: 20px;
  flex-direction: column;
`

const ShowListButton = styled(ButtonM)`

`