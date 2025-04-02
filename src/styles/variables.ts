import { fonts } from './typography';

const palette = {
  [`palettePrimary`]: '#4880EE',
  [`paletteRed`]: '#E84118',
  [`paletteGray`]: '#DADADA',
  [`paletteLightGray`]: '#F2F4F6',
  [`paletteWhite`]: '#FFFFFF',
  [`paletteBlack`]: '#222222',
};

const text = {
  [`textPrimary`]: '#353C49',
  [`textSecondary`]: '#6D7582',
  [`textSubtitle`]: '#8D94A0',
};

const variables = {
  ...palette,
  ...fonts,
  ...text,
};

export default variables;
