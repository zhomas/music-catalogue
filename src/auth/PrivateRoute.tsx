import React, { useCallback, useEffect } from "react";
import type { FC } from "react";
import { SpotifyClient } from "./useSpotifyAuth";

interface ProtectedRouteProps {
  authService: SpotifyClient;
  children: (apiToken: string, logOut: () => void) => React.ReactNode;
}

export const PrivateRoute: FC<ProtectedRouteProps> = ({ authService, children }) => {
  const { isAuthenticated, signOutAndRedirect } = authService;

  const logOut = useCallback(() => {
    signOutAndRedirect((url) => (window.location.href = url));
  }, [signOutAndRedirect]);

  useEffect(() => {
    if (!isAuthenticated) {
      logOut();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <>{children(authService.token, logOut)}</>;
  }

  return null;
};
