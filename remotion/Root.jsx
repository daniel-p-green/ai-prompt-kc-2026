import {Composition} from 'remotion';
import {DesktopWalkthrough} from './DesktopWalkthrough.jsx';
import {MobileWalkthrough} from './MobileWalkthrough.jsx';

export const Root = () => {
  return (
    <>
      <Composition
        id="DesktopWalkthrough"
        component={DesktopWalkthrough}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MobileWalkthrough"
        component={MobileWalkthrough}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
