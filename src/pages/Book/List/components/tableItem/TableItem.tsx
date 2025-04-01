import Button from '@/components/button/Button';
import variables from '@/styles/variables';
import { TBook } from '@/types/book';
import { numberFormat } from '@/utils/common';
import styled from 'styled-components';

type TTableItemProps = {
  data: TBook;
};

const TableItem = ({ data }: TTableItemProps) => {
  return (
    <TableItemWrapper>
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
        <Button variant="primary">구매하기</Button>
        <Button variant="lightGray">상세보기</Button>
      </ButtonWrapper>
    </TableItemWrapper>
  );
};

export default TableItem;

const TableItemWrapper = styled.div`
  display: flex;
  padding: 16px 16px 16px 48px;
  align-items: center;
`;
const ThumbnailWrapper = styled.div`
  width: 48px;
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
  width: 400px;
  h4 {
    ${variables['Title3']}
    color: ${variables['textPrimary']};
  }
  span {
    ${variables['Body2']}
    color: ${variables['textSecondary']};
  }
`;

const PriceWrapper = styled.div`
  margin-left: 22px;
  h4 {
    white-space: nowrap;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: 56px;
  display: flex;
  gap: 8px;
`;
