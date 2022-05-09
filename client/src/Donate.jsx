import React, { useEffect, useState } from 'react';

const Donate = () => {
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
};

export default Donate;