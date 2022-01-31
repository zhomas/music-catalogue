import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import nock from "nock";

import { Dashboard } from "./Dashboard";

const mock = {
  items: [
    {
      track: {
        id: "a",
        album: {
          images: [],
        },
        artists: [{ id: "c" }],
      },
    },
    {
      track: {
        id: "b",
        album: {
          images: [],
        },
        artists: [{ id: "d" }],
      },
    },
  ],
  limit: 2,
  href: "",
};

describe("dashboard", () => {
  nock("https://api.spotify.com")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "Authorization",
    })
    .options("/v1/me/player/recently-played")
    .reply(200, {
      "Access-Control-Allow-Origin": "*",
    })
    .get("/v1/me/player/recently-played")
    .reply(200, mock);

  it("loads and displays tracks", async () => {
    const logout = jest.fn();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Dashboard token={"a"} handleLogout={logout} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByRole("grid"));
  });
});
