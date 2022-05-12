import React, { useState, useEffect } from 'react';
import { BsPlusSquareDotted } from 'react-icons/bs'
import { BiLoaderCircle } from 'react-icons/bi';
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
  }
`;

const ImageInput = styled.input`
  height: inherit;
  width: inherit;
  border-radius: inherit;
  opacity: 0;
  position: absolute;
`;

const PreviewImage = styled.img`
  height: 100%;
`;

const ImageUploader = ({upload = () => {} }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (image) {
      setUploading(true);
      let imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((data) => {
        return getDownloadURL(data.ref);
      })
      .then((url) => {
        setImageURL(url);
        upload(url);
      })
      .catch(() => {
        setImage(null);
        console.error('Encountered a problem uploading the image');
      })
      .finally(() => {
        setUploading(false);
      });
    }
  }, [image]);

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  if (image) {
    return (
    <UploadContainer>
      {
      uploading
        ? <BiLoaderCircle />
        : <PreviewImage src={imageURL}/>
      }
    </UploadContainer>
    );
  } else {
    return (
      <UploadContainer>
          <BsPlusSquareDotted/>
          <ImageInput type="file" onChange={uploadImage}/>
      </UploadContainer>
    );
  }
};

export default ImageUploader;