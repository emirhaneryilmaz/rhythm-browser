import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchTopArtists } from '../api/lastfmApi';
import Loader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const UstDiv = styled.div`
  padding: 20px;
  border-radius: 1vh;
  
`;

const IcDiv = styled.div`
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

const CizgiSerit = styled.div`
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

const ArtistList: React.FC = () => {
  const { isDarkMode } = useTheme();  
  const [topArtists, setTopArtists] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10; // 10 sanatçı her sayfada
  const [totalPages, setTotalPages] = useState(1);

  const fetchArtists = async () => {
    if (page <= totalPages) {
        const { artists, totalPages: fetchedTotalPages } = await fetchTopArtists(
            page,
            perPage
        );

        if (page === 1) {
            setTopArtists(artists);
        } else {

            const uniqueArtists = artists.filter((newArtist) => {
                return !topArtists.some(
                    (existingArtist) => existingArtist.name === newArtist.name
                );
            });

            setTopArtists((prevArtists) => [...prevArtists, ...uniqueArtists]);
        }

        setPage(page + 1);
        setTotalPages(fetchedTotalPages);
    }
};

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <InfiniteScroll
      dataLength={topArtists.length}
      next={fetchArtists}
      hasMore={page <= totalPages}
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
            <IcDiv  isDarkMode={isDarkMode}>
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
