import { useDynamicSvgImport } from '@/hooks/useDynamicSvgImport';
import { ComponentProps } from 'react';
import styled from 'styled-components';

interface LazySvgProps extends ComponentProps<'svg'> {
  iconName: string;
  wrapperClass?: string;
  alt?: string;
}

export const SvgIcon = ({
  iconName,
  wrapperClass = '',
  alt,
  ...rest
}: LazySvgProps) => {
  const { loading, SvgIcon: Svg } = useDynamicSvgImport(iconName);

  return (
    <>
      {Svg && (
        <DefaultWrapperStyle className={wrapperClass}>
          <Svg {...rest} />
        </DefaultWrapperStyle>
      )}
      {!loading && !Svg && (
        <img
          src={iconName}
          alt={alt}
        />
      )}
    </>
  );
};

const DefaultWrapperStyle = styled.div`
  display: flex;
  align-items: center;
`;
