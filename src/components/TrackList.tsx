import React from "react";
import type { FC } from "react";
import { Artist, Track } from "spotify-types";

interface Props {
  items: Track[];
}

export const TrackList: FC<Props> = ({ items }) => {
  const renderAlbumArt = (track: Track) => {
    const srcset = track.album.images.map((img) => `${img.url} ${img.width}w`).join(",");
    return <img srcSet={srcset} alt={track.album.name} />;
  };

  return (
    <ul role={"grid"}>
      {items.map((track) => (
        <li key={track.id}>
          {renderAlbumArt(track)}
          <h4>{track.name}</h4>
        </li>
      ))}
    </ul>
  );
};
