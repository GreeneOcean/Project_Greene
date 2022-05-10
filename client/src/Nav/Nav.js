import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from './components/Search';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isGreene, setIsGreene] = useState(false);

  return (
    <NavContainer>
      <Logo>[ logo here ]</Logo>
      <Search />
      <div style={{ justifyContent: 'end', marginRight: '2 rem' }}>
        {loggedIn ? (
          <ButtonSM type="submit" onClick={() => console.log('Transactions')}>
            Transactions
          </ButtonSM>
        ) : (
          <ButtonSM type="submit" onClick={() => console.log('Log in')}>
            Log in
          </ButtonSM>
        )}
        {isGreene ? (
          <ButtonSM type="submit" onClick={() => console.log('Admin')}>
            Admin
          </ButtonSM>
          ) : (
          <ButtonSM type="submit" onClick={() => console.log('Admin')}>
            Admin
          </ButtonSM>
          )}
      </div>
      {/* <ul>
              <li>link1</li>
              <li>link2</li>
              <li>link3</li>
              <li>Login AUTH Link</li>
            </ul> */}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background: #37782C;
`;

const Logo = styled.div`
  justify-self: start;
  margin-left: 20px;
  cursor: pointer;
`;

const ButtonSM = styled.button`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  color: rgba(11, 191, 125, 0.9);
  background-color: transparent;
  box-shadow: 5px 5px 12px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: rgba(11, 191, 125, 0.9);
    box-shadow: 0px 5px 10px rgba(46, 229, 157, 0.4);
  }
`;

export default Nav;
