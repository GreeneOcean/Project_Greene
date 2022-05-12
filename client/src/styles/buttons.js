import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = css`
  border-radius: 30px;
  border: 2px;
  border-style: solid;
  border-color: var(--color1);
  padding: 10px 15px;
  cursor: pointer;

  transition: all 0.5s;
  color: var(--color1);
  background: transparent;

  :hover {
    background: var(--color1);
    color: white;
  }
`;

export const ButtonL = styled.button`
  ${StyledButton}
  font-size: 3em;
`;

export const ButtonM = styled.button`
  ${StyledButton}
  font-size: 2em;
`;

export const ButtonS = styled.button`
  ${StyledButton}
  font-size: 1em;
`;

export const LogSignButton = styled.div`
  font-weight: bold;
  color: #37782c;
  width: 100px;
  &:hover {
    cursor: pointer;
    color: lightgreen;
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
