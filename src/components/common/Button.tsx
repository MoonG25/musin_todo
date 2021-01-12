import styled from 'styled-components';

const Button = styled.button`
  color: white;
  background: ${p => p.theme.colors.primary};
  font-weight: bold;
  box-shadow: none;
  border: none;
  width: 100%;
  display: block;
  white-space: none;
  padding: 11px;
  border-radius: 4px;
  font-size: 1em;
  margin-top: 5px;
  cursor: pointer;

  &:disabled {
    background: #eee;
    color: #666;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export {Button};