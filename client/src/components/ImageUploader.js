import React, { useState, useEffect } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs'
import styled from 'styled-components';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/index.js';

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
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (image) {
      let imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((data) => {
        return getDownloadURL(data.ref);
      })
      .then((url) => {
        setImageURL(url);
      })
      .catch(() => {
        setImage(null);
        console.error('Encountered a problem uploading the image');
      });
    }
  }, [image]);

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  if (image) {
    return (
    <UploadContainer>
      <img src={imageURL}/>
    </UploadContainer>
    );
    // return <UploadContainer><img src=""></img></UploadContainer>;
  } else {
    return (
      <UploadContainer>
          <label>
            <BsPlusSquareDotted/>
            <input type="file" onChange={uploadImage}/>
          </label>
      </UploadContainer>
    );
  }
};

export default ImageUploader;