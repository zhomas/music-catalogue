import React from "react";
import type { FC } from "react";

interface Props {}

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.append("response_type", "token");
authUrl.searchParams.append("client_id", "31059155624846048fbb3fa9b92289c2");
authUrl.searchParams.append("scope", "user-read-recently-played");
authUrl.searchParams.append("redirect_uri", "http://localhost:3000/callback");

export const Login: FC<Props> = () => {
  return (
    <button
      onClick={(e) => {
        window.open(authUrl);
      }}
    >
      Log in
    </button>
  );
};
