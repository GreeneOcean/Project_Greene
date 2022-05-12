import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Search from './Search';
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
import { Link } from 'react-router-dom';

<<<<<<< HEAD
const Nav = ({ user }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isGreene, setIsGreene] = useState(user.admin);
  const [menu, setMenu] = useState(false);
=======
const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isGreene, setIsGreene] = useState(false);
  const [menu, setMenu] = useState(false)
>>>>>>> parent of a56d27c... Ib sy db (#34) adding location to server and route by url

  useEffect(() => {
    const sideMenu = document.getElementById('sideMenu');
    if (menu) {
      sideMenu.style.transform = 'translate(0, 0)';
    } else {
      sideMenu.style.transform = 'translate(100%,0)';
    }
  }, [menu]);

<<<<<<< HEAD
  useEffect(() => {
    setIsGreene(user.admin);
  }, [user.admin]);

=======
>>>>>>> parent of a56d27c... Ib sy db (#34) adding location to server and route by url
  return (
    <>
      <NavContainer>
        <Link
          to="/"
          style={{
            color: 'white',
          }}
        >
          <GiBoxUnpacking
            style={{
              color: 'white',
              padding: '0 1em',
              width: '4em',
              height: 'auto',
            }}
          />
        </Link>
        <Search />
        <TiThMenu
          style={{
            color: 'white',
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
<<<<<<< HEAD
        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <AiOutlineClose
            style={{
              width: '1.8em',
              height: 'auto',
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => {
              setMenu(!menu);
            }}
          />
        </div>
        <div>
          {loggedIn ? (
            <>
              <StyledLink
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                <Link to="/Transactions">
                  <CgArrowsExchange />
                  {!!isGreene ? 'Admin' : 'Transactions'}
                </Link>
              </StyledLink>
              <StyledLink
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                <Link to="/">
=======
      <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
        <AiOutlineClose style={{
          width:'1.8em',
          height:'auto',
          color: 'black',
          cursor: 'pointer'
        }}
        onClick={() => {
          setMenu(!menu)
        }}/>
      </div>
      {/* {loggedIn ? (
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
            null
          )} */}
          <div>
            {loggedIn ? (
              <>
                <StyledLink>
                  <CgArrowsExchange />
                <Link to='/Transactions'>
                  Transactions
                </Link>
                </StyledLink>
                <StyledLink>
>>>>>>> parent of a56d27c... Ib sy db (#34) adding location to server and route by url
                  <BiMessageRounded />
                  Messages
                </Link>
              </StyledLink>
            </>
          ) : (
            <StyledLink
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <Link to="/Auth">
                <AiOutlineUser />
                Log in
              </Link>
            </StyledLink>
          )}
          <StyledLink
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <Link to="/Browse">
              <AiOutlineUnorderedList />
              Browse
            </Link>
          </StyledLink>
          <StyledLink
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <Link to="/Donate">
              <AiOutlinePlusCircle />
              Donate
            </Link>
          </StyledLink>
        </div>
      </SideMenu>
    </>
  );
};

// width:  ${({display}) => display ? '20%' : '0'};

const SideMenu = styled.div`
  top: 0;
  position: absolute;
  right: 0;
  width: 20%;
  max-width: 300px;
  min-width: 300px;
  height: 100vh;
  background: white;
  border-left: 2px solid var(--color1);
  padding: 1em;
  transition: all 0.5s;
  transform-origin: center left;
  transform: translate(100%, 0);
  z-index: 100;
`;

const NavContainer = styled.nav`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  background: #37782c;
  position: sticky;
  top: 0;
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
  padding: 0.5em 0;
  transition: all 0.5s;
  :hover {
    padding: 0.5em 1em;
  }
  * {
    text-decoration: none;
    display: block;
    color: var(--color1);
    font-size: 1.5em;
  }
  svg {
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

// const MenuIcons = css`
//   color:blue;
// `;

export default Nav;
