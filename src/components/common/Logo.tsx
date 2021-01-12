import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  font-size: 36px;
  user-select: none;
  color: #fff;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo: React.FC = () => {
  return (
    <LogoWrapper>
      LOGO
    </LogoWrapper>
  )
};

export {Logo};