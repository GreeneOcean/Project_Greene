import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const LoadingContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Footer = styled.footer`
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  /* position:absolute;
  bottom:0; */
`;

const PageContainer = styled.div`
  width: 90%;
  min-height: 92vh;
  padding-top: 5vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
`;

export {
  AppContainer,
  LoadingContainer,
  Footer,
  PageContainer
};