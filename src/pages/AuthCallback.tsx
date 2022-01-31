import React, { useEffect } from "react";
import type { FC } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { SpotifyClient } from "../auth/useSpotifyAuth";

interface Props {
  auth: SpotifyClient;
}

export const AuthCallback: FC<Props> = ({ auth }) => {
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token") ?? "";
    const expiresIn = parseInt(params.get("expires_in") ?? "-1");
    auth.storeToken(accessToken, expiresIn * 1000, () => navigate("/"));
  }, []);

  return <span>Loading...</span>;
};
