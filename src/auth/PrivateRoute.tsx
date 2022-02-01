import React, { useCallback, useEffect } from "react";
import type { FC } from "react";
import { AuthService } from "./useSpotifyAuth";

interface ProtectedRouteProps {
  auth: AuthService;
  children: (apiToken: string, logOut: () => void) => React.ReactNode;
}

export const PrivateRoute: FC<ProtectedRouteProps> = ({ auth, children }) => {
  const { isAuthenticated, signOutAndRedirect } = auth;

  const logOut = useCallback(() => {
    signOutAndRedirect((url) => (window.location.href = url));
  }, [signOutAndRedirect]);

  useEffect(() => {
    if (!isAuthenticated) {
      logOut();
    }
  }, [isAuthenticated, logOut]);

  if (isAuthenticated) {
    return <>{children(auth.token, logOut)}</>;
  }

  return null;
};
