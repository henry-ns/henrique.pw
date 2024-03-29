import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import Image from 'next/image';

import type { Variants } from 'framer-motion';
import remarkGfm from 'remark-gfm';

import ExternalLink from '@/components/atoms/ExternalLink';
import SectionTitle from '@/components/atoms/SectionTitle';
import TrackControls, {
  TrackControlRef,
} from '@/components/molecules/TrackControls';

import { useTheme } from '@/hooks/useTheme';

import { mod } from '@/utils/math';

import type { SectionData } from '@/interfaces/section';
import type { Track } from '@/interfaces/track';

import { Container, TrackList, TrackItem } from './styles';

interface PlaylistProps {
  tracks: Track[];
  sectionData: SectionData;
}

const imageAnimationVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

function Playlist({ tracks, sectionData }: PlaylistProps) {
  const { setActiveColor } = useTheme();

  const [trackIndex, setTrackIndex] = useState(0);

  const trackControlsRef = useRef<TrackControlRef | null>(null);

  async function getAverageColor(track: Track = tracks[trackIndex]) {
    if (!track) return;

    const averageColorRGB = [0, 0, 0];

    const { url, height, width } = track.album.blurImage;

    const image = new window.Image();
    image.src = url;
    image.crossOrigin = 'anonymous';

    const canvas = document.createElement('canvas');

    canvas.width = +width;
    canvas.height = +height;

    const context = canvas.getContext('2d');

    await new Promise(resolve => {
      image.onload = resolve;
    });

    if (!context) return;

    context.drawImage(image, 0, 0);

    for (let x = 0; x < +width; x += 1) {
      for (let y = 0; y < +height; y += 1) {
        const pixel = context.getImageData(x, y, 1, 1).data;

        for (let c = 0; c < 3; c += 1) {
          averageColorRGB[c] += pixel[c];
        }
      }
    }

    for (let c = 0; c < 3; c += 1) {
      averageColorRGB[c] = Math.floor(averageColorRGB[c] / (+width * +height));
    }

    const averageColor = `rgb(${averageColorRGB[0]}, ${averageColorRGB[1]},${averageColorRGB[2]})`;

    setActiveColor(averageColor);
  }

  function handlePlay(index: number) {
    if (index === trackIndex) {
      trackControlsRef.current?.togglePlay();
      return;
    }

    setTrackIndex(index);
    trackControlsRef.current?.changeTrack(tracks[index].previewUrl);

    getAverageColor(tracks[index]);
  }

  function handleNext() {
    handlePlay((trackIndex + 1) % tracks.length);
  }

  function handlePrevious() {
    handlePlay(mod(trackIndex - 1, tracks.length));
  }

  function handlePause() {
    setActiveColor();
  }

  return (
    <Container>
      <SectionTitle>{sectionData.title}</SectionTitle>

      <div>
        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {sectionData.description}
          </ReactMarkdown>

          <TrackList>
            {tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                isSelected={trackIndex === index}
                onClick={() => handlePlay(index)}
              >
                <dt>{track.name}</dt>
                <dd>{track.artists.map(artist => artist.name).join(', ')}</dd>
              </TrackItem>
            ))}
          </TrackList>
        </div>

        <aside>
          {tracks[trackIndex] && (
            <ExternalLink
              variants={imageAnimationVariants}
              whileHover="hover"
              whileTap="tap"
              href={tracks[trackIndex].externalUrl}
            >
              <Image
                alt="Album"
                placeholder="blur"
                blurDataURL={tracks[trackIndex].album.blurImage.url}
                src={tracks[trackIndex].album.image.url}
                height={tracks[trackIndex].album.image.height}
                width={tracks[trackIndex].album.image.width}
              />
            </ExternalLink>
          )}

          <TrackControls
            ref={trackControlsRef}
            initialTrack={tracks[0]?.previewUrl}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onPlay={getAverageColor}
            onPause={handlePause}
          />
        </aside>
      </div>
    </Container>
  );
}

export default Playlist;
