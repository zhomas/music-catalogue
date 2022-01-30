import { useState } from "react";

const SPOTIFY_TOKEN_KEY = "spot_token";

export const useSpotify = () => {
  const [token, setToken] = useState<string>(
    window.localStorage.getItem(SPOTIFY_TOKEN_KEY) ?? ""
  );

  const getLoginURL = () => {
    const params = new URLSearchParams({
      response_type: "token",
    });

    const url = new URL("https://accounts.spotify.com/authorize");
    url.searchParams.append("response_type", "token");
    url.searchParams.append("client_id", "31059155624846048fbb3fa9b92289c2");
    url.searchParams.append("scope", "user-read-recently-played");
    url.searchParams.append("redirect_uri", "http://localhost:3000/callback");

    return url.toString();
  };

  return {
    token,
    isLoggedIn: !!token,
    redirectToLoginScreen: getLoginURL,
    loginURL: getLoginURL(),
    login: (token: string) => {
      setToken(token);
      window.localStorage.setItem(SPOTIFY_TOKEN_KEY, token);
    },
    logOut: () => {
      setToken("");
      window.localStorage.removeItem(SPOTIFY_TOKEN_KEY);
    },
  };
};

export type SpotifyClient = ReturnType<typeof useSpotify>;
