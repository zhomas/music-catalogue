import React, { FC } from "react";
import { render, screen } from "@testing-library/react";
import { AuthCallback } from "./AuthCallback";
import { AuthService } from "../auth/useSpotifyAuth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Auth callback screen", () => {
  it("shows a loading message", () => {
    const auth: AuthService = {
      token: "",
      isAuthenticated: false,
      storeToken: jest.fn(),
      signOutAndRedirect: jest.fn(),
    };

    render(
      <MemoryRouter initialEntries={["/auth"]}>
        <Routes>
          <Route path="/auth" element={<AuthCallback auth={auth} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Loading...")).toBeInTheDocument();
  });

  it("stores the token supplied in the query string", () => {
    const auth: AuthService = {
      token: "",
      isAuthenticated: false,
      storeToken: jest.fn(),
      signOutAndRedirect: jest.fn(),
    };

    render(
      <MemoryRouter initialEntries={["/auth#?access_token=token&expires_in=1"]}>
        <Routes>
          <Route path="/auth" element={<AuthCallback auth={auth} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(auth.storeToken).toHaveBeenCalledWith("token", 1000, expect.any(Function));
  });
});
