import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import api from "../../api/index";

const TextDisplay = ({
  title,
  category,
  description,
  distance,
  charity_only,
  posted_by,
  interested_users,
  tag,
  state,
}) => {

  const [claimed, setClaimed] = useState(false);
  const { user } = state;
  const navigate = useNavigate();

  const claimHandler = () => {
    api.put
      .interest({ userName: user.user_name, donationId: state.id })
      .then((res) => {
        setClaimed(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const backToBrowse = () => {
    navigate("/Browse", { replace: true });
  };

  return (
    <TextDisplayContainer>
      <Header>
      <p>{`Category:  ${category}`}</p>
      <h1>{title}</h1>
      <span style={{textDecoration:'underline'}}>Donated by:</span><span>{` ${posted_by}`}</span>
      </Header>

      <p style={{fontSize: '1.5em', margin:'1.2em 0'}}>{description}</p>
      <div style={{display:'flex'}}>
      {tag && tag.map((itemTag, idx) => <Tag key={idx}>{itemTag}</Tag>)}
      </div>
      {interested_users && interested_users.length > 0 && (
        <StyledP>{`${interested_users.length} other users are interested in this item`}</StyledP>
      )}
      {claimed && (
        <p>
          The owner of this donation has been notified, you will receive a
          notification if they choose to donate to you.
        </p>
      )}

{charity_only && <StyledP>Charity Only</StyledP>}
      <StyledSpan>
        {!claimed && <button onClick={claimHandler}>Claim</button>}
        <button onClick={backToBrowse}>Back to Browsing</button>
      </StyledSpan>
    </TextDisplayContainer>
  );
};

export default TextDisplay;

const TextDisplayContainer = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 10px;
  color: var(--color2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Header = styled.div`
  * {
    margin: 0.2em 0;
  }

  h1 {
    font-size: 3em;
  }
`;

const StyledSpan = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;

  *{
    margin-right: 2em;

  font-size: 1.5em;
  }

  button {
    border: 2px solid var(--color3);
    border-radius: 6px;
    color: var(--color3);
    background: white;
    padding: 0.5em;
    cursor: pointer;
    transition: all 0.5s;
  }

  button:hover {
    color: white;
    background: var(--color3);
  }
`;

const TitleP = styled.p`
`;

const StyledP = styled.p`
  margin: 5px;
`;

const Tag = styled.div`
  color: white;
  background: var(--color1);
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 1em;
  border-radius: 30px;
  margin-right: 0.2em;
`;
