import React from 'react';
import styled from 'styled-components';
import {Logo} from './Logo';

const HeaderWraper = styled.header`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to right, ${p => p.theme.colors.primary}, ${p => p.theme.colors.secondary});
  z-index: 2;
`;

const Header: React.FC = () => {
  return (
    <HeaderWraper>
      <Logo />
    </HeaderWraper>
  )
};

export {Header};