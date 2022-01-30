import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { SpotifyClient } from "../data/spotify";

const SPOTIFY_TOKEN_KEY = "spot_token";

interface ChildrenProps {
  token: string;
}

interface Props {
  authClient: SpotifyClient;
  children: (p: ChildrenProps) => React.ReactElement;
}

export const AuthGate: FC<Props> = ({ children, authClient }) => {
  if (!authClient.isLoggedIn) {
    return <span>No token</span>;
  }

  return <>{children({ token: authClient.token })}</>;
};
