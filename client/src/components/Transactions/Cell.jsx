import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Cell = ({ status, group, user, item, setOther, clearOther }) => {
  const [rate, setRate] = useState(false);

  return (
    <Container>

      <img src={item.pictures}/>
        <div>
        <h3 onClick={() => clearOther()} >{item.title} {item.category} {item.description} </h3>
        <p onClick={() => setOther(item.posted_by)} >{item.posted_by} </p>
        {(user.charity_state && (group === 'donations' && status === 'donated')) &&
          <button onClick={() => setRate(!rate)}>Rate User</button>}
        {rate &&
          <Modal className='modal'>
            <div>
              MODAL TO RATE USER
            </div>
          </Modal>
        }
      </div>
    </Container>
  );
};

export default Cell;

const Container = styled.div`
margin: 1em 0;
padding: 20px 16px;
border-radius: 20px;
display:flex;
align-items:center;
border:2px solid var(--color1);
`
const Modal = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: blue;
`;
