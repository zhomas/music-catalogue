import { useState } from "react";

const SPOTIFY_EXPIRY_KEY = "spot_expiry";
const SPOTIFY_TOKEN_KEY = "spot_token";

interface Args {
  clientID: string;
  redirectURL: string;
  now: () => number;
  persistence?: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
  };
}

export interface AuthService {
  token: string;
  isAuthenticated: boolean;
  storeToken: (token: string, expiresIn: number, onComplete?: () => void) => void;
  signOutAndRedirect: (onComplete?: (to: string) => void) => void;
}

export const useSpotifyAuth = ({
  clientID,
  redirectURL,
  now,
  persistence,
}: Args): AuthService => {
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
      client_id: clientID,
      redirect_uri: redirectURL,
      response_type: "token",
      scope: "user-read-recently-played",
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
