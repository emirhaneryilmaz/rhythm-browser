import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';


interface CardProps {
  title: string;
  data: {
	artist: any;
	url: URL;
    name: string;
    playcount: number;
    image: Array<{ '#text': string }>;
  }[];
}

interface DarkMode {
	isDarkMode: boolean;
  }

const CardContainer = styled.div<DarkMode>`
  padding: 10px;
  margin: 0 10px;
  background: ${props => (props.isDarkMode ? '#121212' : 'beige')};
  color: ${props => (props.isDarkMode ? 'purple' : 'black')};
  width: calc(50% - 1vh);

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const ItemContainer = styled.div<DarkMode>`
  padding:2vh;
  display: flex;
  align-items: center;
  border-radius: 1vh;
  margin-bottom: 2vh;
  box-shadow: ${props => (props.isDarkMode ? 'rgba(128, 0, 128, 0.5) 15px 15px 8px' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px')};
  color: ${props => (props.isDarkMode ? 'white' : 'black')};

`;

const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 50%;
`;

const Content = styled.div`
display: flex;
justify-content: space-between;
padding: 0 4vh 0 4vh;
width:100%;
`;

const Title = styled.h2`
  font-weight: bold;
`;

const Playcount = styled.div`
  font-size: 0.9em;
`;

const NamePlayContainer = styled.div`
flex: 1;
text-align: left;

`;
const PlayContainer = styled.div`
flex: 1;
text-align: right;;

`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Button = styled.button`
background: url('/play.png') no-repeat center center;
background-size: cover;
border: none;
width: 50px;
height: 50px;
cursor: pointer;
`;

const Card: React.FC<CardProps> = ({ title, data }) => {
  const { isDarkMode } = useTheme();
  console.log(data)
  return (
    <CardContainer isDarkMode={isDarkMode}>
      <Title>{title}</Title>
      {data.map((item) => (
        <ItemContainer isDarkMode={isDarkMode} key={item.name}>
          {item.image && item.image[1] && item.image[1]['#text'] && (
            <Image src={item.image[1]['#text']} alt={item.name} />
          )}
          <Content>
            <NamePlayContainer>
              <div>
                <div>{item.name}</div>
                <div>{item.artist}</div>
              </div>
            </NamePlayContainer>
            <PlayContainer>
              <div>
                <Playcount>Playcount: {item.playcount}</Playcount>
                <div>
                  <StyledLink href={item.url}>
                    <Button></Button>
                  </StyledLink>
                </div>
              </div>
            </PlayContainer>

          </Content>
        </ItemContainer>
      ))}
    </CardContainer>
  );
};

export default Card;
