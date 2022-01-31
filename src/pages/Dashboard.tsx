import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Artist } from "spotify-types";
import { ArtistList } from "../components/ArtistList";
import { TrackList } from "../components/TrackList";
import { useRecentlyPlayed } from "../data/useRecentTracks";

interface Props {
  token: string;
  handleLogout: () => void;
}

export const Dashboard: FC<Props> = ({ token, handleLogout }) => {
  const [status, data] = useRecentlyPlayed(token);
  const [searchParams, setSearchParams] = useSearchParams();
  const [artistID, setArtistID] = useState(searchParams.get("artistID") ?? "");

  useEffect(() => {
    const params = new URLSearchParams({ artistID });
    setSearchParams(params);
  }, [artistID]);

  const artists = useMemo(() => {
    const set = new Set();
    return data
      .flatMap((item) => item.artists)
      .filter((artist) => {
        const id = artist.id;
        return set.has(id) ? false : set.add(id);
      });
  }, [data]);

  const tracks = useMemo(() => {
    return data.filter((track) =>
      artistID ? track.artists.some((artist) => artist.id === artistID) : true
    );
  }, [data, artistID]);

  const onClickArtist = (artist: Artist) => {
    const nextID = artistID === artist.id ? "" : artist.id;
    setArtistID(nextID);
  };

  switch (status) {
    case "loading":
      return <span>Loading...</span>;
    case "error":
      return <button onClick={handleLogout}>Log out</button>;
    default:
    case "ok":
      return (
        <div>
          <ArtistList
            items={artists}
            selectedID={artistID}
            handleSelect={onClickArtist}
          />
          <TrackList items={tracks} />
        </div>
      );
  }
};
