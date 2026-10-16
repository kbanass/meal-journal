import { describe, expect, afterEach, it, vi } from "vitest";

import { getOS, type OsType } from "./getOS";

const userAgents: Record<string, OsType> = {
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36":
    "Android",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1":
    "iOS",
  "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1":
    "Other",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15":
    "Other",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36":
    "Other",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36":
    "Other",
  "Mozilla/5.0 (X11; CrOS x86_64 15359.58.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36":
    "Other",
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)":
    "Other",
};

describe("getOs", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each(Object.entries(userAgents))(
    "For user agent: %s -> returns: %s",
    (userAgent, os) => {
      vi.stubGlobal("navigator", { userAgent: userAgent });

      const osType = getOS();

      expect(osType).toBe(os);
    },
  );
});
