import React from "react";
import type { FC } from "react";
import { Artist } from "spotify-types";
import styled from "@emotion/styled";

interface Props {
  items: Artist[];
  selectedID?: string;
  handleSelect: (artist: Artist) => void;
}

const Button = styled.button<{ selected: boolean }>`
  ${(props) =>
    props.selected &&
    `
    background: red;

  `}
`;

export const ArtistList: FC<Props> = ({ items, selectedID, handleSelect }) => (
  <nav>
    <ul>
      {items.map((artist) => (
        <li key={artist.id}>
          <Button
            selected={artist.id === selectedID}
            onClick={() => handleSelect(artist)}
          >
            {artist.name}
          </Button>
        </li>
      ))}
    </ul>
  </nav>
);
