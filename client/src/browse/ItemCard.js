import React, {useState} from 'react';

import {BsCardImage} from "react-icons/bs";

const ItemCard = (props) => {

  return (
    <div style={{width: "100px", height: '100px'}}>
      {item.pictures && <img src={item.pictures[0]}/>}
      {!item.pictures && <BsCardImage />}
      <p>{item.title}</p>
      <p>{item.description}</p>
      {item.tag.map(tag => {
        return <p>{tag}</p>
      })}
    </div>
  );
};

export default ItemCard;