export const numberFormat = (num: number | undefined | null): string => {
  if (!num) return '0';
  return num.toLocaleString('ko-KR');
};
