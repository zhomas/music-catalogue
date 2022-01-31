import { renderHook, act } from "@testing-library/react-hooks";
import { useSpotify } from "./useSpotifyAuth";

describe("spotify authentication", () => {
  it("authenticates when passed a valid token", () => {
    const { result } = renderHook(() =>
      useSpotify({
        now: () => 1,
      })
    );

    act(() => {
      result.current.storeToken("a", 1);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it("throws an error when passed no token", () => {
    const { result } = renderHook(() =>
      useSpotify({
        now: () => 1,
      })
    );

    act(() => {
      expect(() => result.current.storeToken("", 1)).toThrowError();
    });
  });

  it("throws an error when passed a negative expiry time", () => {
    const { result } = renderHook(() =>
      useSpotify({
        now: () => 1,
      })
    );

    act(() => {
      expect(() => result.current.storeToken("a", -1)).toThrowError();
    });
  });

  it("navigates to the login url", () => {
    const navFn = jest.fn();
    const { result } = renderHook(() =>
      useSpotify({
        now: () => 1,
      })
    );

    act(() => {
      result.current.signOutAndRedirect(navFn);
    });

    expect(navFn).toBeCalledWith(
      expect.stringContaining("https://accounts.spotify.com/authorize?")
    );
  });
});
