import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
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
`;

const PageContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;



export {
  AppContainer,
  LoadingContainer,
  Footer,
  PageContainer
};