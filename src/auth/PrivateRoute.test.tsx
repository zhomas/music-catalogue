import React from "react";
import { render, screen, getByText } from "@testing-library/react";
import { PrivateRoute } from "./PrivateRoute";
import { AuthService } from "./useSpotifyAuth";

describe("private route component", () => {
  it("renders children when authenticated", () => {
    const auth: AuthService = {
      token: "yay",
      isAuthenticated: true,
      storeToken: () => {},
      signOutAndRedirect: jest.fn(),
    };

    render(<PrivateRoute auth={auth}>{(token) => <h1>{token}</h1>}</PrivateRoute>);
    expect(screen.queryByText("yay")).toBeInTheDocument();
    expect(auth.signOutAndRedirect).toBeCalledTimes(0);
  });

  it("does not render children when not authenticated", () => {
    const auth: AuthService = {
      token: "yay",
      isAuthenticated: false,
      storeToken: () => {},
      signOutAndRedirect: jest.fn(),
    };

    render(<PrivateRoute auth={auth}>{(token) => <h1>{token}</h1>}</PrivateRoute>);
    expect(screen.queryByText("yay")).not.toBeInTheDocument();
    expect(auth.signOutAndRedirect).toBeCalledTimes(1);
  });
});
