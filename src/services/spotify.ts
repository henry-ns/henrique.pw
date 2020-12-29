import axios from 'axios';

import tryGet from '@/utils/tryGet';

import { Track } from '@/interfaces/track';

const clientId = process.env.NEXT_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_SPOTIFY_CLIENT_SECRET;

export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

export async function getSpotifyToken(): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`);

  const response = await axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials.toString('base64')}`,
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  });

  const accessToken: string = response.data.access_token;
  const tokenType: string = response.data.token_type;

  axios.defaults.headers.Authorization = `${tokenType} ${accessToken}`;

  return `${tokenType} ${accessToken}`;
}

export async function getSpotifyPlaylist(): Promise<Track[]> {
  await tryGet(getSpotifyToken());

  const [response, error] = await tryGet(
    spotifyApi.get(`playlists/${process.env.NEXT_SPOTIFY_PLAYLIST_ID}`),
  );

  if (error) return [];

  const tracks: Track[] = response.data.tracks.items.map(({ track }) => ({
    id: track.id,
    name: track.name,
    previewUrl: track.preview_url,
    externalUrl: track.external_urls.spotify,
    artists: track.artists,
    album: {
      image: track.album.images[0],
      externalUrl: track.album.external_urls.spotify,
    },
  }));

  return tracks.filter((track) => track.previewUrl);
}
