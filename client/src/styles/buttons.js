import styled, { css } from 'styled-components';

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

const ButtonL = styled.button`
  ${StyledButton}
  font-size: 3em;
`;

const ButtonM = styled.button`
  ${StyledButton}
  font-size: 2em;
`;

const ButtonS = styled.button`
  ${StyledButton}
  font-size: 1em;
`;

export { ButtonL, ButtonM, ButtonS };