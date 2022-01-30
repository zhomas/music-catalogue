import axios from "axios";
import { useEffect, useState } from "react";
import { Track } from "spotify-types";

interface RecentTracksResponse {
  items: {
    track: Track;
    played_at: Date;
    context: {
      external_urls: {
        spotify: string;
      };
      href: string;
      type: string;
      uri: string;
    };
  }[];
  limit: number;
  href: string;
}

type APIState<T> = { status: "loading"; data: T } | { status: "ok"; data: T };

function useAPIHook<T>(token: string, path: string, initialValue: T): APIState<T> {
  const url = `https://api.spotify.com${path}`;
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    (async () => {
      const response = await axios.get<T>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    })();
  }, [token]);

  if (!data) {
    return { status: "loading", data: initialValue };
  }

  return { status: "ok", data };
}

export const useRecentlyPlayed = (token: string) => {
  return useAPIHook<RecentTracksResponse>(token, "/v1/me/player/recently-played", {
    items: [],
    limit: 0,
    href: "",
  });
};

export const useRecentArtists = (token: string) => {};

export const useAPIRequest = (token: string) => {
  const url = "https://api.spotify.com/v1/me/player/recently-played";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RecentTracksResponse | undefined>(undefined);

  useEffect(() => {
    const get = async () => {
      const response = await axios.get<RecentTracksResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      setData(response.data);
    };

    get();
  }, [token]);

  return [loading, data];
};
