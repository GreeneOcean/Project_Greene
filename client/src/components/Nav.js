import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { TiThMenu } from 'react-icons/ti';
import { GiBoxUnpacking } from 'react-icons/gi';
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import { BiMessageRounded } from 'react-icons/bi';
import { ImExit } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { DispatchContext } from '../appState';
import Search from './Search';

const Nav = ({ user }) => {
  // const [loggedIn, setLoggedIn] = useState(!!user.user_name);
  const [, dispatch] = useContext(DispatchContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isGreene, setIsGreene] = useState(user.admin);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sideMenu = document.getElementById("sideMenu");
    if (menu) {
      sideMenu.style.transform = "translate(0, 0)";
    } else {
      sideMenu.style.transform = "translate(100%,0)";
    }
  }, [menu]);

  useEffect(() => {
    setIsGreene(user.admin);
  }, [user.admin]);

  useEffect(() => {
    setLoggedIn(!!user.user_name);
  }, [user.user_name]);

  const logoutClick = (() => dispatch({ type: 'LOG_OUT' }))

  return (
    <>
      <NavContainer>
        <Link
          to="/"
        >
          <GiBoxUnpacking
            style={{
              color:'var(--color2)',
              padding: '0 1em',
              width: '4em',
              height: 'auto',
            }}
          />
        </Link>
        <Search user={user} />
        <TiThMenu
          style={{
            color: 'var(--color2)',
            padding: '0 1em',
            width: '4em',
            height: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => {
            setMenu(!menu);
          }}
        />
      </NavContainer>
      <SideMenu id="sideMenu" display={menu}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <AiOutlineClose
            style={{
              width: '4em',
              paddingLeft: '20px',
              paddingRight: '20px',
              height: 'auto',
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => {
              setMenu(!menu);
            }}
          />
        </div>
        {loggedIn ? (
          <div
            style={{
              textAlign: 'center',
              color: 'var(--color2)',
              fontSize: '1em',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
          >
            Hello {user.user_name}!
          </div>
        ) : null}
        <div>
          {loggedIn ? (
            <>
              <StyledLink onClick={() => {setMenu(!menu);}}>
                <ImExit />
                <Link to='/' onClick={logoutClick}>Log out</Link>
              </StyledLink>
              <StyledLink onClick={() => {setMenu(!menu);}}>
                <CgArrowsExchange />
                <Link to="/Transactions">
                  {isGreene ? 'Admin' : 'Transactions'}
                </Link>
              </StyledLink>
            </>
          ) : (
            <StyledLink onClick={() => {setMenu(!menu);}}>
              <AiOutlineUser />
              <Link to="/Auth">Log in</Link>
            </StyledLink>
          )}
          <StyledLink onClick={() => {setMenu(!menu);}}>
            <AiOutlineUnorderedList />
            <Link to="/Browse">Browse</Link>
          </StyledLink>
          <StyledLink onClick={() => {setMenu(!menu);}}>
            <AiOutlinePlusCircle />
            <Link to="/Donate">Donate</Link>
          </StyledLink>
        </div>
      </SideMenu>
    </>
  );
};

const SideMenu = styled.div`
  top: 0;
  position: absolute;
  right: 0;
  width: var(--SideMenuWidth);
  /* max-width: 350px; */
  /* min-width: 350px; */
  height: 100vh;
  background: white;
  border-left: 3px solid var(--color2);
  padding: 1em;
  transition: all 0.5s;
  transform-origin: center left;
  transform: translate(100%, 0);
  z-index: 100;
`;

const NavContainer = styled.nav`
  box-sizing: border-box;
  margin: 0;
  padding:  0.5em 0;
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  background: white;
  position: sticky;
  top: 0;
  z-index:99;
  filter: drop-shadow(0 1px 5px #000);
`;

const Logo = styled.div`
  justify-self: start;
  margin-left: 20px;
  cursor: pointer;
  color: white;
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

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0;
  transition: all 0.5s;
  color: var(--color2);
  :hover {
    padding: 0.5em 1em;
  }
  * {
    text-decoration: none;
    display: block;
    color: var(--color2);
    font-size: 1.5em;
  }
  svg {
    color: var(--color2);
    font-size: 1em;
    margin-right: 0.5em;
  }
  a {
    display: flex;
    flex-flow: row noWrap;
    align-items: center;
    flex-shrink: 0;
    padding-left: 0.5em;
  }
`;


export default Nav;
