import { TDropdownOptionsProps } from '@/types/common';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
  options: TDropdownOptionsProps[];
  optionClick: (value: TDropdownOptionsProps) => void;
  buttonText?: string;
  buttonClassName?: string;
  rightSvg?: ReactNode;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  optionClick,
  buttonText,
  buttonClassName,
  rightSvg,
  disabled,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'flip', enabled: true }],
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setReferenceElement(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (it: TDropdownOptionsProps) => {
    optionClick(it);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <button
        ref={setReferenceElement}
        className={`DropdownButton ${buttonClassName}`}
        onClick={(e) => toggleDropdown(e)}
        disabled={disabled}
      >
        {buttonText}
        {rightSvg && rightSvg}
      </button>
      {isOpen && (
        <ul
          ref={setPopperElement}
          className="DropdownMenu"
          style={styles.popper as React.CSSProperties}
          {...attributes.popper}
        >
          {options.map((it, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(it)}
            >
              {it.name}
            </li>
          ))}
        </ul>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  .DropdownButton {
    font-weight: 700;
    font-size: 14px;
    color: #353c49;
    padding: 4.5px 8px;
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    width: 100%;
  }
  .DropdownMenu {
    position: absolute;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 4px;
    box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 100%;
    transform: translate(0px, 40px) !important;
  }
`;
