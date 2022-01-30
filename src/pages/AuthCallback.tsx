import React, { useEffect } from "react";
import type { FC } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SpotifyClient } from "../data/spotify";

interface Props {
  auth: SpotifyClient;
}

export const AuthCallback: FC<Props> = ({ auth }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("access_token") ?? "";
    auth.login(token);
    navigate("/");
  }, []);

  return (
    <>
      <span>Loading...</span>
    </>
  );
};
