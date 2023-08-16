import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { fetchArtistTopAlbums, fetchArtistTopTracks } from '../../api/lastfmApi';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Card from '../../components/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-spinners/ClipLoader';
import { useTheme } from '../../context/ThemeContext';

interface ArtistPageProps {
  artistName: string;
  topAlbums: Array<{
    artist: any;
    url: string | URL;
    name: string;
    playcount: number;
    image: Array<{ '#text': string }>;
  }>;
  topTracks: Array<{
    artist: any;
    url: string | URL;
    name: string;
    playcount: number;
    image: Array<{ '#text': string }>;
  }>;
  totalAlbumPages: number;
  totalTrackPages: number;

}

interface DarkMode {
  isDarkMode: boolean;
}

const ArtistPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const TabContainer = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? 'purple' : 'beige')};
  border: none;
  margin:1vh;
  color: ${(props) => (props.active ? '#fff' : '#333')};
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;

`;

const UstDiv = styled.div`
padding: 20px;
border-radius: 1vh;

`;

const IcDiv = styled.div<DarkMode>`
box-shadow: ${props => (props.isDarkMode ? 'rgba(128, 0, 128, 0.5) 15px 15px 8px' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px')};
display: flex;
align-items: center;
border-radius: 1vh;
margin-bottom: 2vh;
color: ${props => (props.isDarkMode ? 'white' : 'black')};
`;

const OrtaDiv = styled.div`
flex: 1;
padding: 10px;
text-align: center;
`;

const ArtistIsim = styled.div`
font-size: 2em;
font-weight:bold;
`;

const ArtistPage: React.FC<ArtistPageProps> = ({
  artistName,
  topAlbums,
  topTracks,
  totalAlbumPages,
  totalTrackPages,
}) => {
  const [activeTab, setActiveTab] = useState<'albums' | 'tracks'>('albums');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [topData, setTopData] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10; // 10 sanatçı her sayfada
  const { isDarkMode } = useTheme();


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 960);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const initialData = [...topAlbums, ...topTracks];
    setTopData(initialData);
  }, [topAlbums, topTracks]);


  const toggleTab = (tab: 'albums' | 'tracks') => {
    setActiveTab(tab);
    setTopData(tab === 'albums' ? topAlbums : topTracks);
  };

  const fetchAlbums = async () => {
    if (page <= totalAlbumPages) {
      const { albums, totalPages: fetchedTotalPages } = await fetchArtistTopAlbums(artistName);

      const uniqueAlbums = albums.filter((newAlbum) => {
        return !topData.some(
          (existingAlbum) => existingAlbum.name === newAlbum.name
        );
      });

      setTopData((prevData) => [...prevData, ...uniqueAlbums]);
      setPage(page + 1);
      setTotalPages(fetchedTotalPages);
    }
  };

  const fetchTracks = async () => {
    if (page <= totalTrackPages) {
      const { tracks, totalPages: fetchedTotalPages } = await fetchArtistTopTracks(artistName);

      const uniqueTracks = tracks.filter((newTrack) => {
        return !topData.some(
          (existingTrack) => existingTrack.name === newTrack.name
        );
      });

      setTopData((prevData) => [...prevData, ...uniqueTracks]);
      setPage(page + 1);
      setTotalPages(fetchedTotalPages);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [topTracks.length]);

  useEffect(() => {
    fetchAlbums();
  }, [topAlbums.length]);


  return (
    <div>
      <Head>
        <title>{artistName}</title>
      </Head>

      <ArtistPageContainer>
        <UstDiv>
          <IcDiv isDarkMode={isDarkMode}>
            <OrtaDiv>
              <ArtistIsim>{artistName}</ArtistIsim>
            </OrtaDiv>
          </IcDiv>
        </UstDiv>
        <TabContainer>
          <Tab
            active={activeTab === 'albums'}
            onClick={() => toggleTab('albums')}
          >
            Top Albums
          </Tab>
          <Tab
            active={activeTab === 'tracks'}
            onClick={() => toggleTab('tracks')}
          >
            Top Tracks
          </Tab>
        </TabContainer>

        <InfiniteScroll
          dataLength={topData.length}
          next={activeTab === 'albums' ? fetchAlbums : fetchTracks}
          hasMore={page <= (activeTab === 'albums' ? totalAlbumPages : totalTrackPages)}
          loader={<Loader color={'#123abc'} loading={true} />}
          style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
        >
          {!isSmallScreen && (
            <div style={{ display: 'flex' }}>
              <Card title="Top Albums" data={topAlbums.map(album => ({ ...album, artist: artistName, url: new URL(album.url) }))} />
              <Card title="Top Tracks" data={topTracks.map(track => ({ ...track, artist: artistName, url: new URL(track.url) }))} />

            </div>
          )}
          {isSmallScreen && (
            <Card
              title={activeTab === 'albums' ? 'Albums' : 'Tracks'}
              data={activeTab === 'albums' ? topAlbums.map(album => ({ ...album, artist: artistName, url: new URL(album.url) })) : topTracks.map(track => ({ ...track, artist: track.artist.name, url: new URL(track.url) }))}
            />

          )}
        </InfiniteScroll>
      </ArtistPageContainer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ArtistPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const artistName = context.query.name as string;
  const { albums: topAlbums, totalPages: totalAlbumPages } = await fetchArtistTopAlbums(artistName);
  const { tracks: topTracks, totalPages: totalTrackPages } = await fetchArtistTopTracks(artistName);

  return {
    props: {
      artistName,
      topAlbums,
      topTracks,
      totalAlbumPages,
      totalTrackPages,
    },
  };
};

export default ArtistPage;
