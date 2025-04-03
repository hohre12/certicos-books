import Button from '@/components/button/Button';
import Dropdown from '@/components/dropdown/Dropdown';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/svgIcon/SvgIcon';
import { HangleBookListTarget } from '@/constants/common';
import variables from '@/styles/variables';
import { TBookListTarget } from '@/types/book';
import { TDropdownOptionsProps } from '@/types/common';
import { useState } from 'react';
import styled from 'styled-components';

type TDetailSearchPopupProps = {
  searchText: string;
  searchTarget: TBookListTarget;
  onClose: () => void;
  handleDetailSearch: (
    searchValue: string,
    searchTarget: TBookListTarget,
  ) => void;
};

const DetailSearchPopup = ({
  searchText,
  searchTarget,
  onClose,
  handleDetailSearch,
}: TDetailSearchPopupProps) => {
  const [text, setText] = useState<string>(searchText);
  const [target, setTarget] = useState<TBookListTarget>(searchTarget);
  const handleSubmit = () => {
    if (!target) return;
    handleDetailSearch(text, target);
  };
  const handleOptionClick = (item: TDropdownOptionsProps) => {
    setTarget(item.value as TBookListTarget);
  };
  return (
    <DetailSearchPopupWrapper>
      <SvgIcon
        iconName="icon-close"
        alt="close"
        wrapperClass={'iconClose'}
        width={18}
        height={18}
        onClick={onClose}
      />
      <SearchInputWrapper>
        <DropdownWrapper>
          <Dropdown
            options={Object.keys(HangleBookListTarget)
              .filter((key) => key !== target)
              .map((key) => ({
                value: key,
                name: HangleBookListTarget[key as TBookListTarget],
              }))}
            optionClick={handleOptionClick}
            buttonText={HangleBookListTarget[target]}
            rightSvg={
              <SvgIcon
                iconName="icon-arrow-down"
                alt="arrow"
                wrapperClass="marginLeft"
              />
            }
          ></Dropdown>
        </DropdownWrapper>
        <InputWrapper>
          <Input
            value={text}
            placeholder="검색어 입력"
            onTextChange={(value) => setText(value)}
          ></Input>
        </InputWrapper>
      </SearchInputWrapper>
      <Button
        variant="primary"
        width={312}
        height={36}
        size="small"
        onClick={handleSubmit}
      >
        검색하기
      </Button>
    </DetailSearchPopupWrapper>
  );
};

export default DetailSearchPopup;

const DetailSearchPopupWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: -135px;
  width: 360px;
  height: 160px;
  background: ${variables['paletteWhite']};
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.1);
  padding: 36px 24px;
  .iconClose {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`;
const SearchInputWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const DropdownWrapper = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid ${variables['paletteGray']};
  height: 36px;
  display: flex;
  align-items: center;
  width: 100px;
  .marginLeft {
    margin-left: auto;
  }
  li {
    ${variables['Body2']}
    color: ${variables['textSubtitle']};
    cursor: pointer;
    padding: 6px;
    border-radius: 5px;
    &:hover {
      background: #eee;
    }
  }
`;
const InputWrapper = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid ${variables['palettePrimary']};
  height: 36px;
  display: flex;
  align-items: center;
  input {
    margin-top: 3px;
    font-size: 14px;
  }
`;
