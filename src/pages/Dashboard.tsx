import { FC, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Artist } from "spotify-types";
import { useAPIRequest, useRecentlyPlayed } from "../data/useApiRequest";

interface Props {
  token: string;
  handleLogout: () => void;
}

export const Dashboard: FC<Props> = ({ token, handleLogout }) => {
  const recently = useRecentlyPlayed(token);

  const [searchParams, setSearchParams] = useSearchParams();

  const artists = useMemo(() => {
    const all = recently.data.items.flatMap((item) => item.track.artists);
    const set = new Set();
    return all.filter((artist) => {
      const id = artist.id;
      return set.has(id) ? false : set.add(id);
    });
  }, [recently]);

  if (recently.status === "loading") {
    return (
      <>
        <h1>Loading...</h1>;<button onClick={handleLogout}>Log out</button>
      </>
    );
  }

  const onClickArtist = (artist: Artist) => {
    const params = new URLSearchParams({
      artistID: artist.id,
    });

    setSearchParams(params);
  };

  return (
    <div>
      {artists.map((a) => (
        <div>
          <button onClick={() => onClickArtist(a)}>{a.name}</button>
        </div>
      ))}
    </div>
  );

  return <h1>Woohoo</h1>;

  // console.log(artists);

  // return (
  //   <>
  //     <h1>Home</h1>
  //     <span>{token}</span>
  //     {recently.data.items.map((item) => (
  //       <h1>{item.track.name}</h1>
  //     ))}
  //     <button onClick={handleLogout}>Log out</button>
  //   </>
  // );
};
