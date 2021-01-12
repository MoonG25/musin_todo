import React from 'react';
import styled from 'styled-components';
import {Header} from './Header';

const Content = styled.main`
  max-width: 800px;
  margin: 80px auto 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Layout: React.FC = ({children}) => {
  return (
    <>
      <Header />
      <Content>
        {children}
      </Content>
    </>
  )
};

export {Layout};