import React, { useEffect, useMemo, useState } from "react";
import type { FC } from "react";

import type { Artist, Track } from "spotify-types";
import { useSearchParams } from "react-router-dom";
import { ArtistList, TrackList } from "../components";
import { useRecentlyPlayed } from "../data";

interface Props {
  token: string;
  handleLogout: () => void;
}

export const Dashboard: FC<Props> = ({ token, handleLogout }) => {
  const [status, recentTracks] = useRecentlyPlayed(token);
  const [searchParams, setSearchParams] = useSearchParams();
  const [artistID, setArtistID] = useState(searchParams.get("artistID") ?? "");

  const onClickArtist = (artist: Artist) => {
    const nextID = artistID === artist.id ? "" : artist.id;
    setArtistID(nextID);
  };

  useEffect(() => {
    const params = new URLSearchParams({ artistID });
    setSearchParams(params);
  }, [artistID, setSearchParams]);

  const artists: Artist[] = useMemo(() => {
    const set = new Set();
    return recentTracks // return artists by unique id
      .flatMap((item) => item.artists)
      .filter((artist) => {
        const id = artist.id;
        return set.has(id) ? false : set.add(id);
      });
  }, [recentTracks]);

  const tracks: Track[] = useMemo(() => {
    if (!artistID) return recentTracks;
    return recentTracks.filter((track) =>
      track.artists.some((artist) => artist.id === artistID)
    );
  }, [recentTracks, artistID]);

  switch (status) {
    case "loading":
      return <span>Loading...</span>;
    case "error":
      return <button onClick={handleLogout}>Log out</button>;
    case "ok":
    default:
      return (
        <>
          <TrackList items={tracks} />
          <ArtistList
            items={artists}
            selectedID={artistID}
            handleSelect={onClickArtist}
          />
        </>
      );
  }
};
