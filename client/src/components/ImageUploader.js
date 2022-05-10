import React, { useState } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs'
import styled from 'styled-components';

const UploadContainer = styled.div`
  font-size: 64px;
  height: 400px;
  width: 450px;
  color: #999;
  border: 3px solid #999;
  border-radius: 10%;
  display: grid;
  justify-content: center;
  align-content: center;
`;

const ImageUploader = ({upload}) => {
  const [selected, setSelected] = useState(false);

  if (selected) {
    return <UploadContainer></UploadContainer>;
    // return <UploadContainer><img src=""></img></UploadContainer>;
  } else {
    return (
      <UploadContainer>
          <BsPlusSquareDotted/>
      </UploadContainer>
    );
  }
};

export default ImageUploader;