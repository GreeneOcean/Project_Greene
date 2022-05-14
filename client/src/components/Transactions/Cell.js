import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import api from '../../api/index';
import { ButtonS } from '../../styles/buttons.js';
import { DispatchContext } from '../../appState/index'
import imageUrls from "../item/imageUrls"

const Cell = ({ status, group, user, item }) => {
  const [, dispatch] = useContext(DispatchContext)
  const [rate, setRate] = useState(false);
  const [rated, setRated] = useState(false);
  const { id, posted_by, category, description, title,  pictures, interested_users, approved_user, taken_by } = item
  const charity_state = user.charity_state === 'true';
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(imageUrls.Other)


  useEffect(() => {
    if (pictures && pictures.length) {
      if (pictures[0] === imageUrls.dbPhotoUrl) {
        setImage(imageUrls[category]);
      } else {
        setImage(item.pictures[0]);
      }
    }
  }, [pictures]);

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

  const toggleChat = (newUser) => {
    dispatch({
      type: 'TOGGLE_CHAT',
      payload: newUser
    })
  }



  return (
    <Container>

      <PhotoDiv >
        <StyledImage src={image} />
      </PhotoDiv>
      <div>

        <p>Category: {category} </p>
        <h1 onClick={() => clearOther()} >{title} </h1>
        <p style={{fontSize: '0.8em'}}>Donated by {posted_by} </p>
        <p style={{fontSize: '1.2em'}}>Description: {description} </p>
        <div style={{marginTop: '1em'}}>
          <button style={{color: 'var(--color3)', cursor: 'pointer'}} onClick={() => toggleChat(posted_by)} >Chat with {posted_by} </button>
          <p>Interested users</p>
          <InterestedUsers>
            {interested_users && interested_users.map((user, ind) => {
              if (user !== approved_user) {
                return (
                  <InterestedUser
                    id={ind}
                    onClick={() => handleApproveUser(user)}
                  > {user} click to Approve </InterestedUser>
                )
              }
              return (
                <InterestedUser
                  id={ind}
                  onClick={() => handleUnApproveUser(null)}
                > Click to unapprove {user} </InterestedUser>
              )
            })}
          </InterestedUsers>
        </div>
        {charity_state && group === 'donations' && status === 'donated' && !rated &&
          < button onClick={() => setRate(!rate)}>{rate ? <span>Cancel</span>: <span>Rate User</span>}</button>
        }

        {rate &&
          <Modal>
            <input type="text" name="comment" value={comment} onChange={commentChange} placeholder="Add a comment"/>
            <select name="rating" value={rating} onChange={ratingChange}>
              {([1,2,3,4,5]).map((rating) => {
                return <option key={rating} value={rating}>{rating}</option>;
              })}
            </select>
            <ButtonS onClick={handleRating}>Rate</ButtonS>
          </Modal>
        }
      </div>

       </Container>
  );
};
export default Cell;;

const Container = styled.div`
  padding: 1em;
  padding-right: 2em;
  padding-left: 2em;
  border-radius: 20px;
  width: 80%;
  display:flex;
  align-items: center;
  border:2px solid var(--color1);
  background:white;
  margin: 3vh 0;

`
const Modal = styled.div`
  width: 100px;
  height: 10px;
  background-color: blue;
`;

const PhotoDiv = styled.div`
  width:40vh;
  height:100%;
  margin-right: 5%;
  padding: 5%;
  overflow: hidden;
  object-fit: contain;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
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