import React, { useEffect } from "react";
import { FC } from "react";
import "./App.css";
import { AuthCallback } from "./pages/AuthCallback";
import { SpotifyClient, useSpotify } from "./data/spotify";
import { Dashboard } from "./pages/Dashboard";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";

interface ProtectedRouteProps {
  authService: SpotifyClient;
  children: (apiToken: string, logOut: () => void) => React.ReactNode;
}

const PrivateRoute: FC<ProtectedRouteProps> = ({ authService, children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = authService;

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = authService.loginURL;
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <>{children(authService.token, authService.logOut)}</>;
  }

  return null;
};

function App() {
  const spotify = useSpotify();

  return (
    <Router>
      <Routes>
        <Route path="/callback" element={<AuthCallback auth={spotify} />} />
        <Route
          path="/"
          element={
            <PrivateRoute authService={spotify}>
              {(token, logout) => <Dashboard token={token} handleLogout={logout} />}
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
