import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom"
import { ImPlus } from 'react-icons/im';
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

const DonateContainer = styled.div`
  padding: 1em 3em;
  background: rgba(255,255,255,0.4);
  * {
    margin: .3em 0;
  }

  .charity-toggle {
    margin: 0;
  }

  .toggle-span {
    margin-left: .4em;
  }
  border-radius: 0 0 6px 6px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const FieldSection = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FieldInput = styled.input`
  height: 2.5em;
  width: 100%;
  padding: 0 1em;
  border-radius: 6px;
  background-color: white;
  cursor: text;

  :focus {
    background-color: #f5f5f5;
  }
`;

const FieldDropdown = styled.select`
  height: 2.5em;
  width: 100%;
  padding: 0 1em;
  border-radius: 6px;
  background-color: #ebebeb;
  cursor: default;
`;

const FieldTextArea = styled.textarea`
  font-family: inherit;
  height: 7.5em;
  width: 100%;
  padding: 1em;
  border-radius: 6px;
  background-color: #ebebeb;
  cursor: text;
  resize: none;

  :focus {
    background-color: #f5f5f5;
  }
`;

const AddTagSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  #tag {
    width: 90%;
  }

  #add-tag-btn {
    height: 2.5em;
    width: 2.5em;
    background-color: #fff;
    border-radius: 6px;
    border: 2px solid var(--color1);
    color: var(--color1);
    display: grid;
    align-items: center;
    justify-items: center;

    :hover {
      background-color: var(--color1);
      color: #fff;
    }
  }
`;

const RemoveTagMsg = styled.span`
  font-size: 16px;
  font-style: italic;
  color: #666;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2em 0;

  button {
    filter: none;
  }
`;

const SubmitButton = styled(ButtonS)`
  :disabled {
    color: #666;
    border-color: #999;

    :hover {
      color: #666;
      background: transparent;
    }
  }
`;

const StyledAsterisk = styled.span`
  color: red;
`;
const Asterisk = () => {
  return (<StyledAsterisk>*</StyledAsterisk>);
}

const ErrorMessage = styled.div`
  color: red;
`;


function Donate({ state, dispatch, init }) {
  const { donate, dev, user } = state;
  let navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select a Category');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [charityOnly, setCharityOnly] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [valid, setValid] = useState(false);

  const grabData = (data) => {
    return {
      posted_by: user.user_name,
      lat: user.lat,
      lng: user.lng,
      title: data.title || title,
      description: data.description || description,
      category: data.category || category,
      tag: tags,
      charity_only: charityOnly,
      pictures: photo ? [photo] : []
    };
  };

  const setState = (field, data) => {
    const states = {
      title: setTitle,
      description: setDescription,
      category: setCategory,
      charityOnly: setCharityOnly,
      tag: setTag
    };

    let set = states[field];
    set(data);
    setValid(validate(grabData({[field]: data})));
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
    let tagIndex = Number(e.target.id.slice(4));
    const newTags = tags.slice();
    newTags.splice(tagIndex, 1);
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
    navigate('/');
  };

  const submitForm = (e) => {
    e.preventDefault();
    let data = grabData({});

    if (validate(data)) {
      api.post.donation(data)
        .then((res) => {
          console.log(res);
          navigate('/Transactions');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validate = (data) => {
    if (data.title.length < 1) {
      return false;
    } else if (data.description.length < 1) {
      return false;
    } else if (data.category === 'Select a Category') {
      return false;
    } else if (data.user_name === null) {
      return false;
    } else if (data.lat === null || data.lng === null) {
      return false;
    }
    return true;
  };

  return (
    <DonateContainer>
      <h2 style={{ color: 'white', marginTop: '50px' }}>Tell us about your donation</h2>
      <StyledForm>
        <FieldSection htmlFor="title">
          <span style={{ color: 'white' }}>Listing Title<Asterisk/></span>
          <FieldInput type="text" name="title" id="title" value={title} onChange={handleChange} />
        </FieldSection>

        <FieldSection htmlFor="description">
          <span style={{ color: 'white' }}>Description<Asterisk/></span>
          <FieldTextArea name="description" id="description" value={description} onChange={handleChange} />
        </FieldSection>

        <FieldSection htmlFor="category">
          <span style={{ color: 'white' }}>Category<Asterisk/></span>
          <FieldDropdown name="category" id="category" value={category} onChange={handleChange} required>
            {
              ([<option key="none" value="Select a Category">Select a Category</option>])
              .concat(
                categories.map((category, i) => {
                  return <option key={i} value={category}>{category}</option>
                }))
            }
          </FieldDropdown>
        </FieldSection>

        <FieldSection htmlFor="tag">
          <span style={{ color: 'white' }}>Add tags</span>
          <AddTagSection>
            <FieldInput type="text" name="tag" id="tag" value={tag} maxLength="25" onChange={handleChange} onKeyDown={handleKeyDown} />
            <button onClick={handleClick} id="add-tag-btn"><ImPlus/></button>
          </AddTagSection>
          {tags.length > 0 ? <RemoveTagMsg>Click to remove</RemoveTagMsg> : null}
          <TagsContainer tags={tags} onClick={removeTag} clickable={true}/>
        </FieldSection>

        <ToggleSwitch
          style={{ color: 'white' }}
          on="Charity only"
          off="Available to everyone"
          defaultValue={true}
          onChange={setCharityOnly}
        />

        <FieldSection htmlFor="photo">
          <span style={{ color: 'white' }}>Click to add or drag in a photo</span>
          <ImageUploader upload={setPhoto} />
        </FieldSection>
      </StyledForm>

      <ButtonBox>
        <ButtonS name="cancel" onClick={cancel}>Cancel</ButtonS>
        <ButtonS name="post" onClick={submitForm} disabled={!valid}>List Donation</ButtonS>
      </ButtonBox>
    </DonateContainer>
  );
}

export default Donate;