import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AnimatedScreenshot,
  Background,
  BrowserShell,
  fadeWindow,
  FooterSlug,
  HighlightBox,
  moveIn,
  SceneCard,
  TitleBlock,
} from './shared.jsx';
import {fonts, gradients, palette, shadows} from './theme.js';

const screenshotKeyframes = [
  {frame: 0, left: 6, top: 0, scale: 0.95},
  {frame: 160, left: -8, top: -18, scale: 0.98},
  {frame: 255, left: -32, top: -640, scale: 1.01},
  {frame: 292, left: -36, top: -1010, scale: 1.02},
  {frame: 360, left: -36, top: -1010, scale: 1.02},
];

const highlights = [
  {
    body: 'The route spine keeps the station context anchored without dragging the eye away from the next move.',
    end: 118,
    rect: {x: 14, y: 42, width: 255, height: 640, radius: 26},
    start: 74,
    title: 'Route rail stays fixed',
  },
  {
    body: 'Countdowns sit above everything else, so riders see the next arrival before they parse the rest of the system.',
    end: 164,
    rect: {x: 305, y: 36, width: 730, height: 198, radius: 30},
    start: 116,
    title: 'Live arrivals stay first',
  },
  {
    body: 'Walkable options remain attached to the stop context instead of feeling like a disconnected directory.',
    end: 222,
    rect: {x: 300, y: 250, width: 778, height: 216, radius: 30},
    start: 160,
    title: 'Food access is nearby by default',
  },
  {
    body: 'System feed, civic score, and quick actions support the main task with calm secondary emphasis.',
    end: 278,
    rect: {x: 1092, y: 214, width: 242, height: 470, radius: 28},
    start: 214,
    title: 'Context supports, not competes',
  },
  {
    body: 'The lower dashboard closes on civic momentum, community participation, and a clear support action.',
    end: 334,
    rect: {x: 290, y: 448, width: 805, height: 282, radius: 32},
    start: 286,
    title: 'The bottom section rewards the scroll',
  },
];

export const DesktopWalkthrough = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background orientation="landscape" />

      <div
        style={{
          position: 'absolute',
          left: 86,
          top: 98,
          ...moveIn(frame, fps, 0, 34),
        }}
      >
        <TitleBlock
          title="StreetCart KC"
          subtitle="Desktop live walkthrough"
          copy="A calm civic utility view: route context, live arrivals, walkable food access, and community proof in one desktop surface."
          titleStyle={{fontSize: 60, maxWidth: 360}}
          copyStyle={{fontSize: 20, maxWidth: 340}}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 86,
          top: 420,
          width: 308,
          height: 176,
          ...moveIn(frame, fps, 18, 36),
        }}
      >
        {highlights.map((scene) => {
          const opacity = fadeWindow(frame, scene.start, scene.end);

          return (
            <SceneCard
              key={scene.title}
              title={scene.title}
              body={scene.body}
              opacity={opacity}
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
            />
          );
        })}
      </div>

      <BrowserShell
        urlLabel="streetcart-kc-434237915842.us-west1.run.app"
        style={{
          position: 'absolute',
          left: 438,
          top: 104,
          width: 1388,
          height: 840,
          ...moveIn(frame, fps, 12, 48),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(238,244,255,0.52), rgba(255,255,255,0))',
          }}
        />
        <AnimatedScreenshot
          src="video/live-desktop-home.png"
          keyframes={screenshotKeyframes}
          width={1440}
          height={2600}
        />
        {highlights.map((scene) => (
          <HighlightBox
            key={scene.title}
            rect={scene.rect}
            opacity={fadeWindow(frame, scene.start, scene.end)}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            right: 24,
            top: 22,
            padding: '10px 14px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.86)',
            boxShadow: shadows.ambient,
            color: palette.brandBlue,
            fontFamily: fonts.body,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          live demo
        </div>
      </BrowserShell>

      <div
        style={{
          position: 'absolute',
          right: 94,
          top: 68,
          width: 232,
          height: 232,
          borderRadius: 40,
          background: gradients.hero,
          boxShadow: '0 28px 80px rgba(0, 73, 135, 0.18)',
          opacity: 0.14,
          transform: 'rotate(-8deg)',
        }}
      />

      <FooterSlug
        style={{
          position: 'absolute',
          left: 86,
          bottom: 70,
        }}
      >
        Desktop demo rendered from the live deployed product
      </FooterSlug>
    </AbsoluteFill>
  );
};
