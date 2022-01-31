import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import nock from "nock";
import { useAPIHook } from "./useApiRequest";

describe("use api hook", () => {
  const scope = nock("https://api.spotify.com")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "Authorization",
    })
    .options("/")
    .reply(200, {
      "Access-Control-Allow-Origin": "*",
    });

  it("contacts the api and stores the result", async () => {
    scope.get("/").reply(200, {
      greeting: "hi",
    });

    const { result } = renderHook(() =>
      useAPIHook({
        token: "a",
        initialValue: { greeting: "none" },
        path: "/",
      })
    );

    await waitFor(() => expect(result.current[0]).toBe("ok"));
    await waitFor(() => expect(result.current[1]).toEqual({ greeting: "hi" }));
  });

  it("acknowledges errors", async () => {
    scope
      .options("/")
      .reply(200, {
        "Access-Control-Allow-Origin": "*",
      })
      .get("/")
      .reply(401, {
        error: "serious",
      });

    const { result } = renderHook(() =>
      useAPIHook({
        token: "a",
        initialValue: { greeting: "none" },
        path: "/",
      })
    );

    await waitFor(() => expect(result.current[0]).toBe("error"));
    await waitFor(() => expect(result.current[1]).toEqual({ greeting: "none" }));
  });
});
