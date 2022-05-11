import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLinkClickHandler } from "react-router-dom"
import { ButtonL, ButtonM, ButtonS } from '../styles/buttons.js';
import TagsContainer from '../components/TagsContainer.js';
import ToggleSwitch from '../components/ToggleSwitch.js';
import ImageUploader from '../components/ImageUploader.js';
import api from '../api/index.js';

const categories = [
  'Accessories',
  'Arts & Crafts',
  'Baby',
  'Books',
  'Clothing',
  'Education',
  'Electronics',
  'Food',
  'Garden',
  'Home & Furniture',
  'Jewelry',
  'Kitchenware',
  'Movies',
  'Music',
  'Musical Instruments',
  'Office & Stationery',
  'Personal Care',
  'Pet Supplies',
  'Sports',
  'Tools',
  'Toys',
  'Video Games',
  'Other'
];

const PageContainer = styled.div`
  width: 70%;
  padding: 1em 0;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  color: black;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 80%;
`;

const FieldSection = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 2em;
`;

function Donate({ state, dispatch, init }) {
  const { donate, dev } = state;
  useEffect(() => {
    init()
      .then(res => {
        dev.logs && console.log(`\nDonate API init res`, res)
        dev.logs && console.log('Donate state', state)
        dispatch({
          type: `DONATE_INIT`,
          payload: res
        })
      })
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [charityOnly, setCharityOnly] = useState(true);
  const [photo, setPhoto] = useState(null);

  const setState = (field, data) => {
    const states = {
      title: setTitle,
      description: setDescription,
      category: setCategory,
      tag: setTag,
      tags: setTags,
      charityOnly: setCharityOnly,
      photo: setPhoto,
    };

    let set = states[field];
    set(data);
  };

  const handleChange = (e) => {
    setState(e.target.name, e.target.value);
  };

  const addTag = () => {
    if (tag.length > 0 && !tags.includes(tag)) {
      const newTags = tags.slice().concat([tag]);
      setTags(newTags);
      setTag('');
    }
  };

  const removeTag = (e) => {
    let tagIndex = e.target.id.slice(4);
    const newTags = tags.slice(0, tagIndex).concat(tags.slice(tagIndex + 1));
    setTags(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addTag();
  }

  const cancel = (e) => {
    e.preventDefault();
    useLinkClickHandler('Home');
  };

  const submitForm = (e) => {
    e.preventDefault();
    //console.log(title, description, category, tags, charityOnly, photo);
  };

  return (
    <PageContainer>
      <h2>Tell us about your donation</h2>
      <StyledForm>
        <FieldSection htmlFor="title">
          <span>Listing Title</span>
          <input type="text" name="title" id="title" value={title} onChange={handleChange} />
        </FieldSection>

        <FieldSection htmlFor="description">
          <span>Description</span>
          <textarea name="description" id="description" value={description} onChange={handleChange} />
        </FieldSection>

        <FieldSection htmlFor="category">
          <span>Category</span>
          <select name="category" id="category" value={category} onChange={handleChange} required>
            {
              ([<option key={'none'} value={null} selected>Select a Category</option>])
              .concat(
                categories.map((category, i) => {
                  return <option key={i} value={category}>{category}</option>
                }))
            }
          </select>
        </FieldSection>

        <FieldSection htmlFor="tag">
          <span>Add tags</span>
          <span>
            <input type="text" name="tag" id="tag" value={tag} onChange={handleChange} onKeyDown={handleKeyDown} />
            <button onClick={handleClick}>+</button>
          </span>
          {tags.length > 0 ? <span>Click to remove</span> : null}
          <TagsContainer tags={tags} onClick={removeTag} clickable={true}/>
        </FieldSection>

        <ToggleSwitch on="Charity only" off="Available to everyone" defaultValue={true} onChange={setCharityOnly} />

        <FieldSection htmlFor="photo">
          <span>Click to add or drag in a photo</span>
          <ImageUploader upload={setPhoto} />
        </FieldSection>
      </StyledForm>

      <ButtonBox>
        <ButtonS name="cancel" onClick={cancel}>Cancel</ButtonS>
        <ButtonS name="post" onClick={submitForm}>List Donation</ButtonS>
      </ButtonBox>
    </PageContainer>
  );
}


// dispatch({
//   type: 'GET_DONATIONS',
//   payload: { donate: [2, 3, 4, 5, 6, 7, 8] }
// })
// {/* {donate.map((val, ind) => <p key={ind} >{val.toString()}</p>)} */}

export default Donate;