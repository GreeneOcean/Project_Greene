import React from 'react';
import styled from 'styled-components';
import Tag from './Tag.js';

const TagBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const TagsContainer = ({tags, onClick = () => {} }, clickable=false) => {
  return (
    <TagBox>
      {tags.map((tag, i) => {
        return <Tag key={i} id={'tag-' + i} tag={tag} onClick={onClick} clickable={clickable}/>;
      })}
    </TagBox>
  );
};

export default TagsContainer;