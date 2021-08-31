import { scaleFont } from './mixins';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'MontSerrat';
export const FONT_FAMILY_BOLD = 'Montserrat-Regular';
export const FONT_FAMILY_SEMI_BOLD = 'Montserrat-SemiBold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_SEMI_BOLD = '600';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_TITLE = scaleFont(20);
export const FONT_SIZE_BUTTON = scaleFont(18);
export const FONT_SIZE_TEXT = scaleFont(16);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_SEMI_BOLD = {
    fontFamily: FONT_FAMILY_SEMI_BOLD,
    fontWeight: FONT_WEIGHT_SEMI_BOLD,
};