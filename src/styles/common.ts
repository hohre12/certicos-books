import styled from 'styled-components';

export const Favorite = styled.input.attrs({ type: 'checkbox' })<{
  $size?: number;
  $top?: number;
  $right?: number;
}>`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &::before {
    display: none !important;
  }

  &::after {
    position: absolute !important;
    top: ${({ $top = 0 }) => `${$top}px`} !important;
    right: ${({ $right = 0 }) => `${$right}px`} !important;
    width: ${({ $size = 20 }) => `${$size}px`} !important;
    height: ${({ $size = 20 }) => `${$size}px`} !important;
    content: '' !important;
    background-size: ${({ $size = 20 }) => `${$size}px`} !important;
    background-image: url('../src/assets/svgs/icon-unchecked-favorite.svg') !important;
    background-repeat: no-repeat !important;
    border: none !important;
    background-color: transparent !important;
    border-radius: 0px !important;
    box-sizing: initial !important;
  }

  &:checked::after {
    background-image: url('../src/assets/svgs/icon-checked-favorite.svg') !important;
  }
`;
