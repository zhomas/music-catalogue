import React from "react";
import type { FC } from "react";
import { Artist } from "spotify-types";
import styled from "@emotion/styled";

interface Props {
  items: Artist[];
  selectedID?: string;
  handleSelect: (artist: Artist) => void;
}

const List = styled.ul`
  height: 100%;
  text-align: right;
  padding: 50px;
  background: #141414;
`;

const Item = styled.li`
  margin-top: 40px;

  & + & {
    margin-top: 10px;
  }
`;

const Button = styled.button<{ selected: boolean }>`
  display: block;
  width: 100%;
  text-align: right;
  border: 0;
  background: #2d2d2d;
  color: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;

  ${(props) =>
    props.selected &&
    `
    background: #69fd80;
    color: #000;
    `}
`;

export const ArtistList: FC<Props> = ({ items, selectedID, handleSelect }) => (
  <List>
    <h4>Recent artists</h4>
    {items.map((artist) => (
      <Item key={artist.id}>
        <Button selected={artist.id === selectedID} onClick={() => handleSelect(artist)}>
          {artist.name}
        </Button>
      </Item>
    ))}
  </List>
);
