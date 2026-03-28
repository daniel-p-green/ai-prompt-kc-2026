import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadManrope} from '@remotion/google-fonts/Manrope';

const {fontFamily: displayFont} = loadManrope('normal', {
  subsets: ['latin'],
  weights: ['700', '800'],
});

const {fontFamily: bodyFont} = loadInter('normal', {
  subsets: ['latin'],
  weights: ['400', '500', '600', '700'],
});

export const fonts = {
  body: bodyFont,
  display: displayFont,
};

export const palette = {
  brandBlue: '#0081C6',
  brandNavy: '#004987',
  routeBlue: '#0693E3',
  surface: '#FFFFFF',
  surfaceMuted: '#F7FBFE',
  surfaceLow: '#EEF4FF',
  surfaceContainer: '#E5EEFF',
  surfaceHigh: '#D1E4FF',
  inkStrong: '#0E3558',
  ink: '#4D6985',
  line: 'rgba(18, 50, 77, 0.08)',
  warning: '#F3B72F',
};

export const shadows = {
  ambient: '0 18px 54px rgba(0, 29, 54, 0.08)',
  frame: '0 24px 72px rgba(0, 29, 54, 0.16)',
  highlight: '0 0 0 1px rgba(6, 147, 227, 0.45), 0 18px 44px rgba(0, 73, 135, 0.18)',
};

export const gradients = {
  hero: `linear-gradient(135deg, ${palette.brandNavy} 0%, ${palette.brandBlue} 56%, ${palette.routeBlue} 100%)`,
  wash: 'linear-gradient(180deg, #f8fbff 0%, #eef5ff 56%, #f8fbff 100%)',
};
