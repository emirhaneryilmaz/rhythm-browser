import axios from 'axios';
require('dotenv').config();

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = 'https://ws.audioscrobbler.com/2.0/';

const lastfmApi = axios.create({
  baseURL,
  params: {
    api_key: API_KEY,
    format: 'json',
  },
});

export const fetchTopArtists = async (page: number, limit: number) => {

  const response = await lastfmApi.get('', {
    params: {
      method: 'chart.getTopArtists',
      page,
      limit,
    },
  });
  return {
    artists: response.data.artists.artist,
    totalPages: Math.ceil(response.data.artists['@attr'].total / limit),
  };
};

export const fetchArtistTopAlbums = async (artistName: string) => {
  const response = await lastfmApi.get('', {
    params: {
      method: 'artist.getTopAlbums',
      artist: artistName,
    },
  });
  const topalbums = response.data.topalbums;
  const totalPages = Number(topalbums['@attr'].totalPages); 

  return {
    albums: topalbums.album,
    totalPages: totalPages,
  };
};

export const fetchArtistTopTracks = async (artistName: string) => {
  const response = await lastfmApi.get('', {
    params: {
      method: 'artist.getTopTracks',
      artist: artistName,
    },
  });
  
  const toptracks = response.data.toptracks;
  const totalPages = Number(toptracks['@attr'].totalPages); 

  return {
    tracks: toptracks.track,
    totalPages: totalPages,
  };
};
