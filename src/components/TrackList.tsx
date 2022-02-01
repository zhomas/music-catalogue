import React from "react";
import type { FC } from "react";
import type { Track } from "spotify-types";
import styled from "@emotion/styled";

const Container = styled.section`
  height: 100vh;
  overflow-y: scroll;
  flex: 1;
  padding: 50px;
`;

const Grid = styled.ul`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 20px;
`;

const GridItem = styled.li`
  background: #141414;
  padding: 10px;
  aspect-ratio: 0.85;
  img {
    width: 100%;
  }
`;

interface Props {
  items: Track[];
}

export const TrackList: FC<Props> = ({ items }) => {
  const renderTrack = (track: Track) => {
    const srcset = track.album.images.map((img) => `${img.url} ${img.width}w`).join(",");
    return (
      <GridItem key={track.id}>
        <img srcSet={srcset} alt={track.album.name} />
        <h4>{track.name}</h4>
        <span>{track.artists[0].name}</span>
      </GridItem>
    );
  };

  return (
    <Container>
      <h1>Recently played</h1>
      <Grid role={"grid"}>{items.map(renderTrack)}</Grid>
    </Container>
  );
};
