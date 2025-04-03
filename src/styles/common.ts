import styled from 'styled-components';
import variables from './variables';

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px);
  .loading {
    width: 48px;
    height: 48px;
    border: 5px solid #eee;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px);
  .error {
    ${variables['Caption']}
    color: ${variables['textSecondary']};
  }
`;

export const NoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: auto;
  align-items: center;
  justify-content: center;
  padding: 120px;
  & > span {
    ${variables['Caption']}
    color: ${variables['textSecondary']};
  }
`;

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
