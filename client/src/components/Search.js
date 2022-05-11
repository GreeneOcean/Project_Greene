import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Search = () =>{
    const [searchText, setSearchText] = useState('');

    // useEffect(() => {
    //   handleSearchFilter(searchText);
    // }, [searchText]);

    const handleSearchChange = (e) => {
      setSearchText(e.target.value);
    };

    return (
      <div style={{
        width:'50%'
      }}>
        <input
          id="search"
          type="search"
          autoComplete="off"
          maxLength="150"
          style={{
            height: '40px',
            width: '100%',
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: 'rgb(245,245,245)',
            // border: '2px solid rgb(169,169,169)',
            transition: 'all 0.5s',
            cursor: 'text',
            // backgroundColor: 'rgba(11, 191, 125, 0.9)';
            // box-shadow: '0px 5px 10px rgba(46, 229, 157, 0.4)';
          }}
          value={searchText}
          onChange={handleSearchChange}
          placeholder={'Search donations...'}
        />
        <i role="presentation" />
      </div>
    )
}

export default Search