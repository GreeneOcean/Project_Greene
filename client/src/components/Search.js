import React, { useContext } from "react";
import { DispatchContext } from '../appState/index'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Search = ({ user }) =>{
    const [, dispatch] = useContext(DispatchContext);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
      dispatch({
        type: 'SET_SEARCH',
        payload: e.target.value
      })
    };

    const handleSearchSubmit = (e) => {
      if (e.keyCode === 13) {
        navigate('/Browse');
      }
    }

    return (
      <Header >
        <SearchInput
          id="search"
          type="search"
          autoComplete="off"
          maxLength="150"
          value={user.searchTerm}
          onChange={handleSearchChange}
          placeholder={'Search donations...'}
          onKeyDown={handleSearchSubmit}
        />
        <i role="presentation" />
      </Header>
    )
}

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`

const SearchInput = styled.input`
  height: 70%;
  min-height: 40px;
  width: 45%;
  border-radius: 6px;
  padding: 12px;
  background-color: rgb(233,233,233);
  transition: 'all 0.5s';
  cursor: 'text';
`

export default Search