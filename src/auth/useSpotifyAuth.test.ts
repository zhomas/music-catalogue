import { renderHook, act } from "@testing-library/react-hooks";
import { useSpotifyAuth } from "./useSpotifyAuth";

describe("spotify authentication", () => {
  it("authenticates when passed a valid token", () => {
    const { result } = renderHook(() =>
      useSpotifyAuth({
        now: () => 1,
        clientID: "a",
        redirectURL: "/b",
      })
    );

    act(() => {
      result.current.storeToken("a", 1);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it("throws an error when passed no token", () => {
    const { result } = renderHook(() =>
      useSpotifyAuth({
        now: () => 1,
        clientID: "a",
        redirectURL: "/b",
      })
    );

    act(() => {
      expect(() => result.current.storeToken("", 1)).toThrowError();
    });
  });

  it("throws an error when passed a negative expiry time", () => {
    const { result } = renderHook(() =>
      useSpotifyAuth({
        now: () => 1,
        clientID: "a",
        redirectURL: "/b",
      })
    );

    act(() => {
      expect(() => result.current.storeToken("a", -1)).toThrowError();
    });
  });

  it("navigates to the login url", () => {
    const navFn = jest.fn();
    const { result } = renderHook(() =>
      useSpotifyAuth({
        now: () => 1,
        clientID: "a",
        redirectURL: "/b",
      })
    );

    act(() => {
      result.current.signOutAndRedirect(navFn);
    });

    expect(navFn).toBeCalledWith(
      expect.stringContaining("https://accounts.spotify.com/authorize?")
    );
  });

  it("starts unauthenticated", () => {
    const { result } = renderHook(() =>
      useSpotifyAuth({
        clientID: "a",
        redirectURL: "/b",
        now: () => 1,
        persistence: {
          getItem: (key: string) => {
            const data: { [key: string]: string } = {
              spot_token: "",
              spot_expiry: "",
            };

            return key in data ? data[key] : null;
          },
          setItem: () => {},
          removeItem: () => {},
        },
      })
    );

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("initialises using persistent storage", () => {
    const { result } = renderHook(() =>
      useSpotifyAuth({
        now: () => 1,
        clientID: "a",
        redirectURL: "/b",
        persistence: {
          getItem: (key: string) => {
            const data: { [key: string]: string } = {
              spot_token: "token",
              spot_expiry: "1000",
            };

            return key in data ? data[key] : null;
          },
          setItem: () => {},
          removeItem: () => {},
        },
      })
    );

    expect(result.current.isAuthenticated).toBe(true);
  });
});
