import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {fonts, gradients, palette, shadows} from './theme.js';

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

export const fadeWindow = (frame, start, end, edge = 12) => {
  const fadeIn = interpolate(frame, [start, start + edge], [0, 1], clamp);
  const fadeOut = interpolate(frame, [end - edge, end], [1, 0], clamp);
  return Math.max(0, Math.min(fadeIn, fadeOut));
};

export const moveIn = (frame, fps, start, distance = 24) => {
  const progress = spring({
    fps,
    frame: frame - start,
    config: {
      damping: 200,
      mass: 0.9,
      stiffness: 160,
    },
  });

  return {
    opacity: progress,
    transform: `translate3d(0, ${(1 - progress) * distance}px, 0)`,
  };
};

export const keyframedNumber = (frame, keyframes, key) => {
  return interpolate(
    frame,
    keyframes.map((item) => item.frame),
    keyframes.map((item) => item[key]),
    clamp,
  );
};

export const Background = ({orientation = 'landscape'}) => {
  const frame = useCurrentFrame();
  const {height, width} = useVideoConfig();
  const drift = interpolate(frame, [0, 360], [0, orientation === 'portrait' ? 70 : 42], clamp);
  const railShift = interpolate(frame, [0, 360], [0, orientation === 'portrait' ? 28 : 18], clamp);

  return (
    <AbsoluteFill
      style={{
        background: gradients.wash,
        color: palette.inkStrong,
        fontFamily: fonts.body,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top left, rgba(6, 147, 227, 0.14), transparent 28%), radial-gradient(circle at 78% 12%, rgba(0, 73, 135, 0.16), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: orientation === 'portrait' ? 220 - drift : -40 - drift,
          right: orientation === 'portrait' ? -180 : -80,
          width: orientation === 'portrait' ? 640 : 720,
          height: orientation === 'portrait' ? 640 : 720,
          borderRadius: 999,
          background: 'rgba(209, 228, 255, 0.66)',
          filter: 'blur(12px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: orientation === 'portrait' ? -220 : -160,
          bottom: orientation === 'portrait' ? 260 : -220 + drift,
          width: orientation === 'portrait' ? 600 : 840,
          height: orientation === 'portrait' ? 600 : 840,
          borderRadius: 999,
          background: 'rgba(0, 129, 198, 0.08)',
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: orientation === 'portrait' ? 74 : 96,
          top: orientation === 'portrait' ? 170 : 126,
          width: orientation === 'portrait' ? 8 : width - 192,
          height: orientation === 'portrait' ? height - 340 : 8,
          borderRadius: 999,
          background: gradients.hero,
          boxShadow: '0 12px 30px rgba(0, 73, 135, 0.18)',
          transform:
            orientation === 'portrait'
              ? `translateY(${railShift}px)`
              : `translateX(${railShift}px)`,
        }}
      />
      {Array.from({length: orientation === 'portrait' ? 5 : 6}).map((_, index) => {
        const circleStyle =
          orientation === 'portrait'
            ? {
                left: 66,
                top: 180 + index * ((height - 380) / 4) + railShift,
              }
            : {
                left: 120 + index * ((width - 240) / 5) + railShift,
                top: 118,
              };

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: 24,
              height: 24,
              borderRadius: 999,
              background: palette.surface,
              border: `3px solid ${index === 1 ? palette.brandBlue : 'rgba(255,255,255,0.8)'}`,
              boxShadow: shadows.ambient,
              ...circleStyle,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Eyebrow = ({children, style}) => {
  return (
    <div
      style={{
        color: palette.brandBlue,
        fontFamily: fonts.body,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const TitleBlock = ({
  title,
  subtitle,
  copy,
  align = 'left',
  style,
  eyebrowStyle,
  titleStyle,
  copyStyle,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        textAlign: align,
        ...style,
      }}
    >
      <Eyebrow style={eyebrowStyle}>{subtitle}</Eyebrow>
      <div
        style={{
          color: palette.inkStrong,
          fontFamily: fonts.display,
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          maxWidth: 520,
          ...titleStyle,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: palette.ink,
          fontFamily: fonts.body,
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.5,
          maxWidth: 520,
          ...copyStyle,
        }}
      >
        {copy}
      </div>
    </div>
  );
};

export const BrowserShell = ({children, style, urlLabel}) => {
  return (
    <div
      style={{
        background: palette.surface,
        borderRadius: 34,
        boxShadow: shadows.frame,
        overflow: 'hidden',
        border: `1px solid ${palette.line}`,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: 62,
          padding: '0 22px',
          background: 'rgba(255,255,255,0.9)',
          borderBottom: `1px solid ${palette.line}`,
        }}
      >
        {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
          <div
            key={color}
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: color,
            }}
          />
        ))}
        <div
          style={{
            marginLeft: 10,
            padding: '10px 16px',
            borderRadius: 999,
            background: palette.surfaceLow,
            color: palette.inkStrong,
            fontFamily: fonts.body,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {urlLabel}
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          height: 'calc(100% - 62px)',
          background: palette.surfaceMuted,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const PhoneShell = ({children, style}) => {
  return (
    <div
      style={{
        background: '#0d2035',
        borderRadius: 62,
        padding: 16,
        boxShadow: shadows.frame,
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 48,
          background: palette.surface,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            width: 186,
            height: 30,
            borderRadius: 999,
            background: '#10273f',
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
        />
        {children}
      </div>
    </div>
  );
};

export const AnimatedScreenshot = ({src, keyframes, width, height}) => {
  const frame = useCurrentFrame();
  const left = keyframedNumber(frame, keyframes, 'left');
  const top = keyframedNumber(frame, keyframes, 'top');
  const scale = keyframedNumber(frame, keyframes, 'scale');

  return (
    <Img
      src={staticFile(src)}
      style={{
        position: 'absolute',
        left,
        top,
        width: width * scale,
        height: height * scale,
      }}
    />
  );
};

export const HighlightBox = ({rect, opacity = 1}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        borderRadius: rect.radius ?? 26,
        boxShadow: shadows.highlight,
        background: 'rgba(255,255,255,0.08)',
        opacity,
      }}
    />
  );
};

export const SceneCard = ({title, body, style, opacity}) => {
  return (
    <div
      style={{
        borderRadius: 28,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${palette.line}`,
        boxShadow: shadows.ambient,
        padding: '24px 24px 22px',
        opacity,
        ...style,
      }}
    >
      <div
        style={{
          color: palette.inkStrong,
          fontFamily: fonts.display,
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: palette.ink,
          fontFamily: fonts.body,
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 1.55,
          marginTop: 10,
        }}
      >
        {body}
      </div>
    </div>
  );
};

export const FooterSlug = ({children, style}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 18px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.82)',
        border: `1px solid ${palette.line}`,
        color: palette.inkStrong,
        fontFamily: fonts.body,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        boxShadow: shadows.ambient,
        ...style,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: palette.routeBlue,
          boxShadow: '0 0 0 6px rgba(6, 147, 227, 0.15)',
        }}
      />
      {children}
    </div>
  );
};
