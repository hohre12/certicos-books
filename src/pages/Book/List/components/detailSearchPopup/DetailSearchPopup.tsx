import Button from '@/components/button/Button';
import Dropdown from '@/components/dropdown/Dropdown';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/svgIcon/SvgIcon';
import variables from '@/styles/variables';
import styled from 'styled-components';

const DetailSearchPopup = () => {
  return (
    <DetailSearchPopupWrapper>
      <SearchInputWrapper>
        <DropdownWrapper>
          <Dropdown
            buttonText="제목"
            rightSvg={
              <SvgIcon
                iconName="icon-arrow-down"
                alt="arrow"
                wrapperClass="marginLeft"
              />
            }
          >
            <li>
              <p>테스트1</p>
            </li>
            <li>
              <p>테스트2</p>
            </li>
          </Dropdown>
        </DropdownWrapper>
        <InputWrapper>
          <Input placeholder="검색어 입력"></Input>
        </InputWrapper>
      </SearchInputWrapper>
      <Button
        variant="primary"
        width={312}
        height={36}
        size="small"
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
  width: 360px;
  height: 160px;
  background: ${variables['paletteWhite']};
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.1);
  padding: 36px 24px;
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
