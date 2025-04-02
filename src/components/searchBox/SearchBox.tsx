import LocalStorage from '@/utils/localStorage';
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { SvgIcon } from '../svgIcon/SvgIcon';
import Input from '../input/Input';
import variables from '@/styles/variables';

type TSearchBoxProps = {
  className?: string;
  value: string;
  placeholder?: string;
  recentKey?: string;
  onTextChange?: (value: string) => void;
  onKeyDown?: (value: string) => void;
  onRemoveClick?: () => void;
  onRecentClick?: (value: string) => void;
};

const SearchBox = ({
  className,
  value,
  placeholder,
  recentKey,
  onTextChange,
  onKeyDown,
  onRemoveClick,
  onRecentClick,
}: TSearchBoxProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (value && recentKey) {
          const updatedSearches = [
            value,
            ...recentSearches.filter((recent) => recent !== value),
          ].slice(0, 8);
          setRecentSearches(updatedSearches);
          LocalStorage.setItem(recentKey, JSON.stringify(updatedSearches));
        }
        if (onKeyDown) {
          onKeyDown(value);
          setIsFocus(false);
        }
      }
    },
    [value, recentKey, onKeyDown, recentSearches],
  );

  const handleRecentClick = useCallback(
    (value: string) => {
      if (recentKey) {
        const updatedSearches = [
          value,
          ...recentSearches.filter((recent) => recent !== value),
        ].slice(0, 8);
        setRecentSearches(updatedSearches);
        LocalStorage.setItem(recentKey, JSON.stringify(updatedSearches));
      }
      if (onTextChange) onTextChange(value);
      if (onRecentClick) onRecentClick(value);
      setIsFocus(false);
    },
    [onTextChange, onRecentClick, recentSearches, recentKey],
  );

  const handleRecentDelete = useCallback(
    (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, keyword: string) => {
      if (recentKey) {
        e.stopPropagation();
        const updatedSearches = [
          ...recentSearches.filter((recent) => recent !== keyword),
        ];
        setRecentSearches(updatedSearches);
        LocalStorage.setItem(recentKey, JSON.stringify(updatedSearches));
      }
    },
    [recentKey, recentSearches],
  );

  const handleFocusOut = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e: any) => {
      handleFocusOut(e);
    });
    if (recentKey) {
      const storedSearches = LocalStorage.getItem(recentKey);
      if (storedSearches) setRecentSearches(JSON.parse(storedSearches));
    }
    return () => {
      document.removeEventListener('mousedown', (e: any) => {
        handleFocusOut(e);
      });
    };
  }, [recentKey]);

  return (
    <SearchBoxRootWrapper
      $isFocus={isFocus}
      className={className}
      ref={searchBoxRef}
    >
      <SvgIcon
        iconName="icon-search"
        alt="search"
      />
      <Input
        value={value}
        onTextChange={onTextChange}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onKeyDown={handleKeyDown}
        onRemoveClick={onRemoveClick}
      />
      {recentKey && isFocus && (
        <RecentRootWrapper>
          {recentSearches.map((recent, idx) => (
            <RecentWrapper key={idx}>
              <span onClick={() => handleRecentClick(recent)}>{recent}</span>
              <SvgIcon
                iconName="icon-close"
                alt="close"
                onClick={(e) => handleRecentDelete(e, recent)}
              />
            </RecentWrapper>
          ))}
        </RecentRootWrapper>
      )}
    </SearchBoxRootWrapper>
  );
};

export default SearchBox;

const SearchBoxRootWrapper = styled.div<{ $isFocus: boolean }>`
  width: 480px;
  height: 50px;
  padding: 10px;
  border-radius: ${(props) => (props.$isFocus ? '24px 24px 0 0' : '24px')};
  display: flex;
  gap: 10px;
  align-items: center;
  background: ${variables['paletteLightGray']};
  position: relative;
`;

const RecentRootWrapper = styled.div`
  padding: 10px 48px 28px 48px;
  width: 100%;
  z-index: 200;
  position: absolute;
  top: 50px;
  left: 0;
  background: ${variables['paletteLightGray']};
  border-radius: 0 0 24px 24px;
`;
const RecentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  cursor: pointer;
  & > span {
    width: 100%;
    ${variables['Caption']}
    color: ${variables['textSubtitle']};
  }
`;
