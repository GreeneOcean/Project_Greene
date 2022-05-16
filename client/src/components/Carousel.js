import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

export default function Carousel(props) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let newImages = [];
    newImages.push(['https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2268&q=80']);
    newImages.push(['https://images.unsplash.com/photo-1593113616828-6f22bca04804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80']);
    newImages.push(['https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80']);
    newImages.push(['https://images.unsplash.com/photo-1644726270363-e746b37b482b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80']);

    setImages(newImages);
  }, []);

  const dummyCharities =[
    {
      title: "Toys for Tots",
      description: 'Filling kids voids with toys'
    },
    {
      title: "Boy's and Girl's Club of America",
      description: 'Empower the youth of today with your gifts'
    },
    {
      title: "Care for the Elderly",
      description: 'Feed their love for the vintage'
    },
    {
      title: "Midtown Theatre Alliance",
      description: 'Donate to the arts and keep drama alive'
    },
    ]

  const nextImage = () => {
    setCurrent((current === images.length - 1) ? 0 : current + 1);
  }

  const prevImage = () => {
    setCurrent((current === 0) ? images.length - 1 : current - 1);
  }

  useEffect(() => {
    const scroll = setTimeout(() => {
      nextImage()
    }, 10000);
    return () => {
      clearTimeout(scroll);
    }
  }, [current])

  return (
    <MainContainer>
      {images.map((image, index) => (
        <ImageContainer id='test' active={index === current}>
          {index === current && <Slide
          style={{
            minWidth:'100%',
            height:'100%',
            backgroundSize:'cover',
            backgroundImage: `url(${image})`,
            borderRadius: '6px',
            }} >
            <TextDiv >
            <h1>{dummyCharities[index].title}</h1>
            <p>{dummyCharities[index].description}</p>
            </TextDiv>
            </Slide>}
         </ImageContainer>
      ))}
      <RightArrow onClick={nextImage}/>
      <LeftArrow onClick={prevImage}/>
      <NavDiv>
        {images.map((image, index) => (
          <Dot
          key={index}
          active={current === index}
          onClick={() => {
            setCurrent(index);
          }}/>
        ))}
      </NavDiv>
    </MainContainer>
  );
}

const MainContainer = styled.section`
  position: relative;
  width: 75%;
  height: 50vh;
  background: var(--color3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5em;
`;

const Dot = styled(GoPrimitiveDot)`
  color: white;
  width: 2em;
  height: auto;
  fill:${({active}) => active ? 'white' : 'transparent'};
  stroke-width:1;
  cursor: pointer;
`;

const NavDiv = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
`;

const ImageContainer = styled.div`
  width:100%;
  height:100%;
  display: ${({active}) => active ? 'block' : 'none'};
  transition: all 1s;
  background:var(--color3);
`;

const TextDiv = styled.div`
background: rgba(255,255,255,0.8);
width: content-fit;
height: content-fit;
padding: 2em;
color: var(--color1);

h1{
  font-size: 3em;
}

p{
  margin: 1.5em 0;
  font-size: 1.5em;
}
`;

const Slide = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  animation-name: fade-in;
  animation-duration: 2s;

  @keyframes fade-in{
    0% {opacity: 0}
    100% {opacity: 1}
  }
`

const StyledArrow = css`
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  color: white;
  width: 6em;
  height: auto;
  cursor: pointer;
  transition: all 0.5s;

  :hover {
    width: 8em;
  }
`;

const RightArrow = styled(MdOutlineKeyboardArrowRight)`
  ${StyledArrow}
  right: 0;
`;

const LeftArrow = styled(MdOutlineKeyboardArrowLeft)`
  ${StyledArrow}
  left: 0;
`;