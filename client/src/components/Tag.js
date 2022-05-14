import React from 'react';
import styled from 'styled-components';

const TagSpan = styled.span`
  color: white;
  background: var(--color2);
  padding: .2em .5em;
  border-radius: .6em;

  && {
    margin-right: .3em;
  }
`;

const ClickableTagSpan = styled(TagSpan)`
  :hover, :focus {
    background: var(--color3);
  }
`;

const Tag = ({tag, id, onClick, clickable=false}) => {
  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      onClick(e);
    }
  }

  if (clickable) {
    return (
      <ClickableTagSpan id={id} onClick={onClick} onKeyDown={handleKeyDown} tabIndex="0">{tag}</ClickableTagSpan>
    );
  } else {
    return (
      <TagSpan id={id}>{tag}</TagSpan>
    );
  }
};

export default Tag;