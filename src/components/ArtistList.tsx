import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchTopArtists } from '../api/lastfmApi';
import Loader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

interface DarkMode {
  isDarkMode: boolean;
}

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

const SolDiv = styled.div`
  padding: 10px;
  margin-right: 10px;
`;

const ArtistImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 50%;
`;

const OrtaDiv = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
`;

const ArtistBaslik = styled.div`
  font-weight: bold;
`;

const CizgiSerit = styled.div<DarkMode>`
  border-top: ${props => (props.isDarkMode ? '1px solid #fff' : '1px solid #000')};
  margin: 10px 0;
  color:
`;

const ArtistIsim = styled.div`
  font-size: 1.2em;
`;

const SagDiv = styled.div`
  padding: 10px;
  text-align: center;
`;

const ListenerPlaycount = styled.div`
  font-size: 0.9em;
`;

const ListenerBilgi = styled.p`
  float: left;
`;

const PlaycountBilgi = styled.p``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const ArtistList: React.FC<{ initialArtists: any[] }> = ({ initialArtists }) => {
  const { isDarkMode } = useTheme();
  const [topArtists, setTopArtists] = useState(initialArtists);
  const [page, setPage] = useState(2); // İlk sayfa zaten yüklendi
  const perPage = 10;

  const fetchArtists = async () => {
    const { artists } = await fetchTopArtists(page, perPage);
    setTopArtists((prevArtists) => [...prevArtists, ...artists]);
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
    dataLength={topArtists.length}
    next={fetchArtists}
    hasMore={true} // Daha fazla sanatçı olup olmadığını kontrol etmek için bir mantık ekleyebilirsiniz
    loader={<Loader color={'#123abc'} loading={true} />}
    style={{ overflow: 'hidden' }}
  >
      <UstDiv>
        {topArtists.map((artist) => (
          <StyledLink
            href={`/artists/${encodeURIComponent(artist.name)}`}
            passHref
            key={artist.name}
          >
            <IcDiv isDarkMode={isDarkMode}>
              <SolDiv>
                <ArtistImage
                  src={artist.image[2]['#text']}
                  alt={artist.name}
                />
              </SolDiv>
              <OrtaDiv>
                <ArtistBaslik>Artist</ArtistBaslik>
                <CizgiSerit isDarkMode={isDarkMode} />
                <ArtistIsim>{artist.name}</ArtistIsim>
              </OrtaDiv>
              <SagDiv>
                <ListenerPlaycount>
                  <ListenerBilgi>Listeners: {artist.listeners}</ListenerBilgi>
                  <PlaycountBilgi>Playcount: {artist.playcount}</PlaycountBilgi>
                </ListenerPlaycount>
              </SagDiv>
            </IcDiv>
          </StyledLink>
        ))}
      </UstDiv>
    </InfiniteScroll>
  );
};

export default ArtistList;
