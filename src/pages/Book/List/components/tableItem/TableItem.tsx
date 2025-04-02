import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/svgIcon/SvgIcon';
import variables from '@/styles/variables';
import { TBook } from '@/types/book';
import { numberFormat } from '@/utils/common';
import styled from 'styled-components';

type TTableItemProps = {
  data: TBook;
  isOpen: boolean;
  onOpen: () => void;
};

const TableItem = ({ data, isOpen, onOpen }: TTableItemProps) => {
  return (
    <TableItemRootWrapper>
      <TableItemWrapper $isOpen={isOpen}>
        <ThumbnailWrapper>
          <img src={data.thumbnail} />
        </ThumbnailWrapper>
        <TitleWrapper>
          <h4>{data.title}</h4>
          <span>{data.authors}</span>
        </TitleWrapper>
        <PriceWrapper>
          <h4>{`${numberFormat(data.price)}원`}</h4>
        </PriceWrapper>
        <ButtonWrapper>
          <Button variant="primary">
            <p>구매하기</p>
          </Button>
          <Button
            variant="lightGray"
            onClick={onOpen}
          >
            <p>상세보기</p>
            <SvgIcon
              iconName="icon-arrow-down"
              alt="arrow"
            />
          </Button>
        </ButtonWrapper>
      </TableItemWrapper>

      <TableItemDetailWrapper $isOpen={isOpen}>
        <DetailThumbnailWrapper>
          <img src={data.thumbnail} />
        </DetailThumbnailWrapper>
        <DetailInfoWrapper>
          <div className="detailTitleWrapper">
            <h4>{data.title}</h4>
            <span>{data.authors}</span>
          </div>
          <div className="detailContentWrapper">
            <h5>책 소개</h5>
            <p>{data.contents}</p>
          </div>
        </DetailInfoWrapper>
        <DetailButtonWrapper $isSalePrice={!!data.sale_price}>
          <Button
            variant="lightGray"
            onClick={onOpen}
          >
            <p>상세보기</p>
            <SvgIcon
              iconName="icon-arrow-down"
              style={{ transform: 'rotate(180deg)' }}
              alt="arrow"
            />
          </Button>
          <div className="detailPriceWrapper">
            <div>
              <span>원가</span>
              <h4 className="price">{`${numberFormat(data.price)}원`}</h4>
            </div>
            <div>
              <span>할인가</span>
              <h4>{`${numberFormat(data.sale_price)}원`}</h4>
            </div>
          </div>
          <Button
            variant="primary"
            style={{ marginTop: '28px' }}
            width={240}
          >
            구매하기
          </Button>
        </DetailButtonWrapper>
      </TableItemDetailWrapper>
    </TableItemRootWrapper>
  );
};

export default TableItem;

const TableItemRootWrapper = styled.div``;
const TableItemWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  padding: ${({ $isOpen }) => ($isOpen ? '0px' : '16px 16px 16px 48px')};
  align-items: center;
  opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
  transition: max-height 0.2s ease-in-out;
  border-bottom: 1px solid ${variables['paletteGray']};
  max-height: ${({ $isOpen }) => ($isOpen ? '0px' : 'none')};
`;
const ThumbnailWrapper = styled.div`
  min-width: 48px;
  height: 68px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const TitleWrapper = styled.div`
  margin-left: 48px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex: 1 1 auto;
  min-width: 300px;
  h4 {
    ${variables['Title3']}
    color: ${variables['textPrimary']};
    min-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  span {
    ${variables['Body2']}
    color: ${variables['textSecondary']};
    white-space: nowrap;
    min-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const PriceWrapper = styled.div`
  margin-left: 22px;
  min-width: 80px;
  text-align: right;
  h4 {
    white-space: nowrap;
  }
`;

const ButtonWrapper = styled.div`
  min-width: 250px;
  margin-left: 56px;
  display: flex;
  gap: 8px;
`;

//
const TableItemDetailWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  padding: ${({ $isOpen }) => ($isOpen ? '24px 16px 38px 54px' : '0px')};
  align-items: center;
  max-height: ${({ $isOpen }) => ($isOpen ? '350px' : '0px')};
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: max-height 0.2s ease-in-out;
  border-bottom: 1px solid ${variables['paletteGray']};
`;

const DetailThumbnailWrapper = styled.div`
  min-width: 210px;
  height: 280px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 32px;
  flex: 1 1 auto;
  min-width: 300px;
  & > .detailTitleWrapper {
    display: flex;
    gap: 16px;
    align-items: center;
    h4 {
      ${variables['Title3']}
      color: ${variables['textPrimary']};
    }
    span {
      ${variables['Body2']}
      color: ${variables['textSecondary']};
      white-space: nowrap;
    }
  }
  & > .detailContentWrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    h5 {
      font-weight: 700;
      font-size: 14px;
      line-height: 26px;
      color: ${variables['textPrimary']};
    }
    p {
      font-weight: 500;
      font-size: 10px;
      line-height: 16px;
      color: ${variables['textPrimary']};
    }
  }
`;
const DetailButtonWrapper = styled.div<{ $isSalePrice: boolean }>`
  min-width: 250px;
  text-align: right;
  margin-left: 48px;
  & > .detailPriceWrapper {
    margin-top: 94px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    & > div {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
      & > span {
        ${variables['Small']}
        color: ${variables['textSubtitle']};
      }
      & > h4 {
        font-weight: 700px;
        font-size: 18px;
        line-height: 26px;
        &.price {
          font-weight: 350;
          text-decoration: ${({ $isSalePrice }) =>
            $isSalePrice ? 'line-through' : 'none'};
        }
      }
    }
  }
`;
