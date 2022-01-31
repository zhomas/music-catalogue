import React from "react";
import { render, screen, getByText } from "@testing-library/react";
import { PrivateRoute } from "./PrivateRoute";
import { SpotifyClient } from "./useSpotifyAuth";

describe("private route component", () => {
  it("renders children when authenticated", () => {
    const auth: SpotifyClient = {
      token: "yay",
      isAuthenticated: true,
      storeToken: () => {},
      signOutAndRedirect: jest.fn(),
    };

    render(<PrivateRoute authService={auth}>{(token) => <h1>{token}</h1>}</PrivateRoute>);
    expect(screen.queryByText("yay")).toBeInTheDocument();
    expect(auth.signOutAndRedirect).toBeCalledTimes(0);
  });

  it("does not render children when not authenticated", () => {
    const auth: SpotifyClient = {
      token: "yay",
      isAuthenticated: false,
      storeToken: () => {},
      signOutAndRedirect: jest.fn(),
    };

    render(<PrivateRoute authService={auth}>{(token) => <h1>{token}</h1>}</PrivateRoute>);
    expect(screen.queryByText("yay")).not.toBeInTheDocument();
    expect(auth.signOutAndRedirect).toBeCalledTimes(1);
  });
});
