import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../../api/index';
import { ButtonS } from '../../styles/buttons.js';

const Donated = ({ status, group, user, item, setOther, clearOther }) => {
  const [rate, setRate] = useState(false);
  const [rated, setRated] = useState(false);
  const { id, posted_by, category, description, title,  pictures, interested_users, approved_user, taken_by } = item
  const charity_state = user.charity_state === 'true';
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const ratingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const commentChange = (e) => {
    setComment(e.target.value);
  }

  const handleRating = (e) => {
    e.preventDefault();
    api.post.review({
      rated_user_name: approved_user.user_name,
      posted_by_name: user.user_name,
      value: rating,
      message: comment
     })
      .then((res) => {
        console.log('Rated user', res);
        setRate(false);
        setRated(true);
      })
      .catch(err => console.log('Err in rating user', err.message))
  };

  const handleApproveUser = (approved_user) => {
    api.put.donation({ id, approved_user, state: 'approved' })
      .then(res => console.log('Approved user', res))
      .catch(err => console.log('Err in approving user', err.message))
  }

  const handleUnApproveUser = () => {
    api.put.donation({ id, approved_user: null, state: 'claimed' })
      .then(res => console.log('UnApproved user', res))
      .catch(err => console.log('Err in unapproving user', err.message))
  }

  return (
    <Container>
      <img src={pictures}/>
        <h3 onClick={() => clearOther()} >{title} </h3>
        <p>Donated by {posted_by} </p>
        <p>Category: {category} </p>
        <p>Description: {description} </p>
        <p>Interested users</p>
        <InterestedUsers>
          {interested_users.map((user, ind) => {
            if (user !== approved_user) {
              return (
                <InterestedUser
                  key={ind}
                  onClick={() => handleApproveUser(user)}
                > {user} click to Approve </InterestedUser>
              )
            }
            return (
              <InterestedUser
                key={ind}
                onClick={() => handleUnApproveUser(null)}
              > Click to unapprove {user} </InterestedUser>
            )
          })}
        </InterestedUsers>
        {charity_state && group === 'donations' && status === 'donated' && !rated &&
          < button onClick={() => setRate(!rate)}>{rate ? <span>Cancel</span>: <span>Rate User</span>}</button>
        }


        <Modal>
          <input type="text" name="comment" value={comment} onChange={commentChange} placeholder="Add a comment"/>
          <select name="rating" value={rating} onChange={ratingChange}>
            {([1,2,3,4,5]).map((rating) => {
              return <option key={rating} value={rating}>{rating}</option>;
            })}
          </select>
          <ButtonS onClick={handleRating}>Rate</ButtonS>
        </Modal>
       </Container>
  );
};

export default Donated;

const Container = styled.div`
  padding: 1em;
  padding-right: 2em;
  padding-left: 2em;
  border-radius: 20px;
  width: 80%;
  display:flex;
  align-items: center;
  border:2px solid var(--color1);
`
const Modal = styled.div`
  width: 100px;
  height: 10px;
  background-color: blue;
`;


const InterestedUsers = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
`
const InterestedUser = styled.div`
  display: flex;
  padding: 0.25em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  margin-right: 0.5em;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 5px;
  background-color: var(--color2);

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`