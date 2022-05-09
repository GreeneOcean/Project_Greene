import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLinkClickHandler } from "react-router-dom"
import { PageContainer } from '../styles/index.js';
import TagsContainer from '../components/TagsContainer.js';
import ToggleSwitch from '../components/ToggleSwitch.js';
import ImageUploader from '../components/ImageUploader.js';

const categories = [
  'Clothing',
  'Food',
  'Toys'
];

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
  const [category, setCategory] = useState('');
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

  const uploadImage = (e) => {
  };

  const cancel = (e) => {
    e.preventDefault();
    useLinkClickHandler('Home');
  };

  const submitForm = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <form>
        <label htmlFor="title">
          Title
          <input type="text" name="title" id="title" value={title} onChange={handleChange}/>
        </label>

        <label htmlFor="description">
          Description
          <textarea name="description" id="description" value={description} onChange={handleChange}/>
        </label>

        <label htmlFor="category">
          Category
          <select name="category" id="category" value={category} onChange={handleChange}>
            {categories.map((category, i) => {
              return <option key={i} value={category}>{category}</option>
            })}
          </select>
        </label>

        <label htmlFor="tag">
          Tags
          <input type="text" name="tag" id="tag" value={tag} onChange={handleChange} onKeyDown={handleKeyDown}/>
          <button onClick={handleClick}>+</button>
          <TagsContainer tags={tags}/>
        </label>

        <ToggleSwitch on="Charity only" off="Available to everyone" defaultValue={true} onChange={setCharityOnly}/>

        <label htmlFor="photo">
          Add a Photo
          <ImageUploader upload={uploadImage}/>
        </label>
      </form>

      <ButtonBox>
        <button name="cancel" onClick={cancel}></button>
        <button name="post" onClick={submitForm}></button>
      </ButtonBox>
    </div>
  );
}


    // dispatch({
    //   type: 'GET_DONATIONS',
    //   payload: { donate: [2, 3, 4, 5, 6, 7, 8] }
    // })
    // {/* {donate.map((val, ind) => <p key={ind} >{val.toString()}</p>)} */}

export default Donate;