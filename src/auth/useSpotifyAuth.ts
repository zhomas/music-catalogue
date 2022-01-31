import { time } from "console";
import { useState } from "react";

const SPOTIFY_EXPIRY_KEY = "spot_expiry";
const SPOTIFY_TOKEN_KEY = "spot_token";

interface UseSpotifyArgs {
  now: () => number;
  persistence?: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
  };
}

export const useSpotify = ({ now, persistence }: UseSpotifyArgs) => {
  const [token, setToken] = useState<string>(
    persistence?.getItem(SPOTIFY_TOKEN_KEY) ?? ""
  );

  const [expiry, setExpiry] = useState<number>(
    parseInt(persistence?.getItem(SPOTIFY_EXPIRY_KEY) ?? "-1", 10)
  );

  const storeToken = (token: string, expiresIn: number, onComplete?: () => void) => {
    if (!token) throw new Error("Invalid token");
    if (expiresIn < 0) throw new Error("Expiry time cannot be in the past");

    const expiryTime = now() + expiresIn;
    setToken(token);
    setExpiry(expiryTime);
    persistence?.setItem(SPOTIFY_TOKEN_KEY, token);
    persistence?.setItem(SPOTIFY_EXPIRY_KEY, expiryTime.toString());

    onComplete && onComplete();
  };

  const signOutAndRedirect = (onComplete?: (to: string) => void) => {
    const params = new URLSearchParams({
      response_type: "token",
      client_id: "31059155624846048fbb3fa9b92289c2",
      scope: "user-read-recently-played",
      redirect_uri: "http://localhost:3000/callback",
    });

    const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

    setToken("");
    setExpiry(-1);
    persistence?.removeItem(SPOTIFY_TOKEN_KEY);
    persistence?.removeItem(SPOTIFY_EXPIRY_KEY);

    onComplete && onComplete(url);
  };

  return {
    storeToken,
    signOutAndRedirect,
    token,
    get isAuthenticated() {
      const t = now();
      return !!token && expiry > t;
    },
  };
};

export type SpotifyClient = ReturnType<typeof useSpotify>;
