import type { APIHook } from "./useApiRequest";

import { Track } from "spotify-types";
import { useAPIHook } from "./useApiRequest";

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

type RecentTracksHook = APIHook<Track[]>;

export const useRecentlyPlayed = (token: string): RecentTracksHook => {
  const [status, data] = useAPIHook<RecentTracksResponse>({
    token,
    path: "/v1/me/player/recently-played",
    initialValue: {
      items: [],
      limit: 0,
      href: "",
    },
  });

  return [status, data.items.map((item) => item.track)];
};
