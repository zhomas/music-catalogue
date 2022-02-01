import React from "react";
import type { FC } from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useSpotifyAuth, PrivateRoute } from "./auth";
import { Dashboard, AuthCallback } from "./pages";
import { Layout } from "./components";

const App: FC = () => {
  const auth = useSpotifyAuth({
    clientID: "31059155624846048fbb3fa9b92289c2",
    redirectURL: "http://localhost:3000/callback",
    now: Date.now,
    persistence: window.localStorage,
  });

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/callback" element={<AuthCallback auth={auth} />} />
          <Route
            path="/"
            element={
              <PrivateRoute auth={auth}>
                {(token, logout) => <Dashboard token={token} handleLogout={logout} />}
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
