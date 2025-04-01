import LocalStorage from '@/utils/localStorage';
import {
  ChangeEvent,
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
  ...props
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
          ];
          setRecentSearches(updatedSearches);
          LocalStorage.setItem(recentKey, JSON.stringify(updatedSearches));
        }
        if (onKeyDown) onKeyDown(value);
      }
    },
    [value, recentKey, onKeyDown, recentSearches],
  );

  const handleRecentClick = useCallback(
    (value: string) => {
      if (onTextChange) onTextChange(value);
      if (onRecentClick) onRecentClick(value);
      setIsFocus(false);
    },
    [onTextChange, onRecentClick],
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
    document.addEventListener('click', (e: any) => {
      handleFocusOut(e);
    });
    if (recentKey) {
      const storedSearches = LocalStorage.getItem(recentKey);
      if (storedSearches) setRecentSearches(JSON.parse(storedSearches));
    }
    return () => {
      document.removeEventListener('click', (e: any) => {
        handleFocusOut(e);
      });
    };
  }, [recentKey]);

  return (
    <SearchBoxRootWrapper className={className}>
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
    </SearchBoxRootWrapper>
  );
};

export default SearchBox;

const SearchBoxRootWrapper = styled.div`
  width: 480px;
  height: 50px;
  padding: 10px;
  border-radius: 100px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: ${variables['paletteLightGray']};
`;
