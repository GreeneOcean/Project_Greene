import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { PageContainer } from '../styles/index.js';

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

  const handleChange = (e) => {
  };

  const alert = (e) => {
    console.log('ALERT:', e.target);
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
            <option>Food</option>
            <option>Toys</option>
          </select>
        </label>

        <label htmlFor="tags">
          Tags
          <input type="text" name="tags" id="tags" value={tag} onChange={handleChange} onSubmit={alert}/>
        </label>
      </form>
    </div>
  );
}


    // dispatch({
    //   type: 'GET_DONATIONS',
    //   payload: { donate: [2, 3, 4, 5, 6, 7, 8] }
    // })
    // {/* {donate.map((val, ind) => <p key={ind} >{val.toString()}</p>)} */}

export default Donate;