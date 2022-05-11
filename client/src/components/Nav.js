import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { TiThMenu } from 'react-icons/ti';
import { GiBoxUnpacking } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { CgArrowsExchange } from 'react-icons/cg';
import { BiMessageRounded } from 'react-icons/bi';
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Search from './Search';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isGreene, setIsGreene] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const sideMenu = document.getElementById('sideMenu');
    if (menu) {
      sideMenu.style.transform = 'translate(0, 0)';
    } else {
      sideMenu.style.transform = 'translate(100%,0)';
    }
  }, [menu]);

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
        {/* <div style={{ justifyContent: 'end', marginRight: '2 rem' }}>
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
            null
          )}
      </div> */}
        {/* <ul>
              <li>link1</li>
              <li>link2</li>
              <li>link3</li>
              <li>Login AUTH Link</li>
            </ul> */}
      </NavContainer>
      <SideMenu id="sideMenu" display={menu}>
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
                <Link onClick={() => console.log('Transactions')}>
                  Transactions
                </Link>
              </StyledLink>
              <StyledLink>
                <BiMessageRounded />
                <Link to="/">Messages</Link>
              </StyledLink>
            </>
          ) : (
            <StyledLink>
              <AiOutlineUser />
              <Link to="/Auth">Log in</Link>
            </StyledLink>
          )}
          {isGreene && (
            <StyledLink>
              <GrUserAdmin />
              <Link to="/Admin">Admin</Link>
            </StyledLink>
          )}
          <StyledLink>
            <AiOutlineUnorderedList />
            <Link to="/Browse">Browse</Link>
          </StyledLink>
          <StyledLink>
            <AiOutlinePlusCircle />
            <Link to="/Donate">Donate</Link>
          </StyledLink>
        </div>
      </SideMenu>
    </>
  );
};

// width:  ${({display}) => display ? '20%' : '0'};

const SideMenu = styled.div`
  min-width: 230px;
  top: 0;
  position: absolute;
  right: 0;
  width: 20%;
  max-width: 300px;
  height: 100vh;
  background: white;
  border-left: 2px solid var(--color1);
  padding: 1em;
  transition: all 0.5s;
  transform-origin: center left;
  transform: translate(100%, 0);
`;

const NavContainer = styled.nav`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  background: #37782c;
  position: fixed;
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
  padding: 0.1em 0;
  transition: all 0.5s;

  :hover {
    padding: 0.1em 1em;
  }

  * {
    text-decoration: none;
    display: block;
    color: var(--color1);
    font-size: 2em;
    display: inline-block;
    vertical-align: middle;
  }

  a {
    padding-left: 0.5em;
  }
`;

// const MenuIcons = css`
//   color:blue;
// `;

export default Nav;
