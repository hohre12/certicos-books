import variables from '@/styles/variables';
import { TVariant } from '@/types/common';
import { HTMLAttributes, MouseEvent } from 'react';
import styled from 'styled-components';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  variant?: TVariant;
  width?: number;
  height?: number;
  size?: 'small' | 'medium';
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  className,
  disabled = false,
  variant = 'gray',
  width,
  height,
  size = 'medium',
  onClick,
  ...props
}: IButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };
  return (
    <ButtonRootWrapper
      $width={width}
      $height={height}
      disabled={disabled}
      className={[className, variant, size].join(' ')}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </ButtonRootWrapper>
  );
};

export default Button;

const ButtonRootWrapper = styled.button<{ $width?: number; $height?: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  border-radius: 8px;
  width: ${(props) => (props.$width ? `${props.$width}px` : '115px')};
  height: ${(props) => (props.$height ? `${props.$height}px` : '48px')};
  border: none;
  white-space: nowrap;
  &.small {
    ${variables['Body2']}
    padding: 5px 10px 5px 10px;
  }
  &.medium {
    ${variables['Caption']}
    padding: 13px 20px;
  }
  // 폰트
  // 패딩
  // 사이즈
  &.gray {
    border: 1px solid ${variables['textSubtitle']};
    color: ${variables['textSubtitle']};
    background: #fff;
  }
  &.primary {
    color: ${variables['paletteWhite']};
    background: ${variables['palettePrimary']};
  }
  &.lightGray {
    ${variables['Caption']}
    color: ${variables['textSecondary']};
    background: ${variables['paletteLightGray']};
  }
`;
