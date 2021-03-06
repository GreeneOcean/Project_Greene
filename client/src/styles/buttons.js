import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = css`
  border-radius: 6px;
  border: 2px;
  border-style: solid;
  border-color: var(--color2);
  padding: 10px 15px;
  cursor: pointer;
  margin: 0 0.5em;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5));
  transition: all 0.5s;
  color: var(--color2);
  background: white;
  :hover {
    background: var(--color1);
    color: white;
  }
`;

export const ButtonL = styled.button`
  ${StyledButton}
  font-size: 2em;
`;

export const ButtonM = styled.button`
  ${StyledButton}
  font-size: 1em;
`;

export const ButtonS = styled.button`
  ${StyledButton}
  font-size: 0.8em;
`;

export const LogSignButton = styled.div`
  font-weight: bold;
  color: var(--color1);
  width: 100px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ButtonMD = styled.button`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 50px;
  width: 400px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: var(--color2);
  box-shadow: 5px 5px 12px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    background-color: var(--color1);
    box-shadow: 0px 5px 10px rgba(46, 229, 157, 0.4);
  }
`;

export const LinkButton = styled(Link)`
  border: 1px solid rgba(11, 191, 125, 0.9);
  border-radius: 6px;
  padding: 10px 50px;
  width: 400px;
  text-align: center;
  text-decoration: none;
  color: #37782C;
  background-color: transparent;
  box-shadow: 5px 5px 12px -5px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #37782C;
    box-shadow: 0px 5px 10px rgba(46, 229, 157, 0.4);
  }
`;