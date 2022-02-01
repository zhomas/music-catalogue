import axios from "axios";
import { useEffect, useState } from "react";

interface UseAPIProps<T> {
  token: string;
  path: string;
  initialValue: T;
}

type Status = "loading" | "error" | "ok";

export type APIHook<T> = [status: Status, data: T];

export function useAPIHook<T>({ token, path, initialValue }: UseAPIProps<T>): APIHook<T> {
  const [data, setData] = useState<T>(initialValue);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<T>(`https://api.spotify.com${path}`, {
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
  }, [token, path]);

  return [status, data];
}
