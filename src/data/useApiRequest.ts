import axios from "axios";
import { useEffect, useState } from "react";

interface UseAPIProps<T> {
  token: string;
  path: string;
  initialValue: T;
}

export type APIHook<T> = [status: "loading" | "ok" | "error", data: T];

export function useAPIHook<T>({ token, path, initialValue }: UseAPIProps<T>): APIHook<T> {
  const url = `https://api.spotify.com${path}`;
  const [data, setData] = useState<T>(initialValue);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatus("ok");
        setData(response.data);
      } catch (e) {
        setStatus("error");
      }
    })();
  }, [token]);

  return [status, data];
}
