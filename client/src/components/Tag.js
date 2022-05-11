import React from 'react';
import styled from 'styled-components';

const TagSpan = styled.span`
  color: white;
  background: var(--color2);
  padding: .2em .5em;
  border-radius: .6em;
  margin-right: .3em;
`;

const Tag = ({tag, id, onClick=()=>{} }) => {
  return (
    <TagSpan id={id} onClick={onClick}>{tag}</TagSpan>
  );
};

export default Tag;