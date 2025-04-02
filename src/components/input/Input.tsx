import {
  ChangeEvent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { SvgIcon } from '../svgIcon/SvgIcon';
import variables from '@/styles/variables';

type TInputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'date'
  | 'datetime-local';

interface IInputProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'medium' | 'large';
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  type?: TInputType;
  prefixNode?: ReactNode;
  onTextChange?: (value: string) => void;
  onRemoveClick?: () => void;
}

const Input = ({
  size = 'medium',
  name,
  placeholder,
  disabled,
  value,
  type,
  onTextChange,
  onRemoveClick,
  ...props
}: IInputProps) => {
  const [text, setText] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
    if (onTextChange) onTextChange(e.target.value);
  };
  const handleRemoveClick = () => {
    setText('');
    if (onTextChange) onTextChange('');
    if (onRemoveClick) onRemoveClick();
  };
  useEffect(() => {
    setText(value ?? '');
  }, [value]);
  return (
    <InputRootWrapper {...props}>
      <InputWrapper
        className={[`${size}`, disabled ? 'disabled' : ''].join(' ')}
      >
        <input
          name={name}
          onChange={handleChange}
          type={type}
          disabled={disabled}
          value={text}
          placeholder={placeholder}
          onFocus={props.onFocus}
        />
        {text.length > 0 && !disabled && (
          <SvgIcon
            iconName="icon-close"
            onClick={handleRemoveClick}
            className={['iconRemove', `${size}`].join(' ')}
            width={18}
            height={18}
          />
        )}
      </InputWrapper>
    </InputRootWrapper>
  );
};

export default Input;

const InputRootWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  transition: 0.2s all;
  background: transparent;
  margin-right: 10px;
  & > input {
    ${variables['Caption']}
    width: 100%;
    background: transparent;
    border: none;
    margin-right: 20px;
    &:focus-visible {
      outline: none !important;
    }
  }
  .iconRemove {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;
