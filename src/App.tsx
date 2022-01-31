import React from "react";
import type { FC } from "react";
import "./App.css";
import { AuthCallback } from "./pages/AuthCallback";
import { useSpotify } from "./auth/useSpotifyAuth";
import { Dashboard } from "./pages/Dashboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";

const App: FC = () => {
  const auth = useSpotify({
    now: Date.now,
    persistence: window.localStorage,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<AuthCallback auth={auth} />} />
        <Route
          path="/"
          element={
            <PrivateRoute authService={auth}>
              {(token, logout) => <Dashboard token={token} handleLogout={logout} />}
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
