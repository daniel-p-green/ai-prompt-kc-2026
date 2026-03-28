import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AnimatedScreenshot,
  Background,
  fadeWindow,
  FooterSlug,
  HighlightBox,
  moveIn,
  PhoneShell,
  SceneCard,
  TitleBlock,
} from './shared.jsx';

const screenshotKeyframes = [
  {frame: 0, left: 0, top: 0, scale: 1.255},
  {frame: 170, left: 0, top: -120, scale: 1.27},
  {frame: 238, left: -8, top: -820, scale: 1.285},
  {frame: 296, left: -12, top: -1760, scale: 1.31},
  {frame: 360, left: -12, top: -1760, scale: 1.31},
];

const highlights = [
  {
    body: 'The rider sees the next arrival immediately, with no extra chrome getting in the way.',
    end: 126,
    rect: {x: 28, y: 54, width: 470, height: 282, radius: 28},
    start: 74,
    title: 'Arrivals stay first',
  },
  {
    body: 'Food choices remain close, scannable, and readable in a one-handed stop-side flow.',
    end: 188,
    rect: {x: 18, y: 350, width: 492, height: 438, radius: 28},
    start: 122,
    title: 'Nearby options stay legible',
  },
  {
    body: 'The civic impact band and quick context land after a short, controlled scroll.',
    end: 286,
    rect: {x: 14, y: 646, width: 500, height: 380, radius: 28},
    start: 236,
    title: 'Civic context arrives later',
  },
  {
    body: 'The impact score lands as a calm secondary module after arrivals and food choices are already clear.',
    end: 334,
    rect: {x: 18, y: 768, width: 496, height: 368, radius: 28},
    start: 286,
    title: 'Impact score stays secondary',
  },
];

export const MobileWalkthrough = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background orientation="portrait" />

      <div
        style={{
          position: 'absolute',
          left: 88,
          right: 88,
          top: 110,
          ...moveIn(frame, fps, 0, 42),
        }}
      >
        <TitleBlock
          title="StreetCart KC"
          subtitle="Mobile live walkthrough"
          copy="One-handed clarity for riders between stops: live arrivals first, food choices next, civic context after the essential decision."
          align="center"
          style={{alignItems: 'center'}}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: 448,
          height: 170,
          ...moveIn(frame, fps, 14, 34),
        }}
      >
        {highlights.map((scene) => (
          <SceneCard
            key={scene.title}
            title={scene.title}
            body={scene.body}
            opacity={fadeWindow(frame, scene.start, scene.end)}
            style={{
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </div>

      <PhoneShell
        style={{
          position: 'absolute',
          left: 248,
          top: 656,
          width: 584,
          height: 1140,
          ...moveIn(frame, fps, 22, 48),
        }}
      >
        <AnimatedScreenshot
          src="video/live-mobile-home.png"
          keyframes={screenshotKeyframes}
          width={430}
          height={2400}
        />
        {highlights.map((scene) => (
          <HighlightBox
            key={scene.title}
            rect={scene.rect}
            opacity={fadeWindow(frame, scene.start, scene.end)}
          />
        ))}
      </PhoneShell>

      <FooterSlug
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 72,
          transform: 'translateX(-50%)',
        }}
      >
        Mobile demo rendered from the live deployed product
      </FooterSlug>
    </AbsoluteFill>
  );
};
