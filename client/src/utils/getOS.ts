export type OsType = "Android" | "iOS" | "Other";

const UA_RULES: ReadonlyArray<readonly [RegExp, OsType]> = [
  [/android/i, "Android"],
  [/iPhone/, "iOS"],
];

const UA_DATA_MAP: Readonly<Record<string, OsType>> = {
  Android: "Android",
  iOS: "iOS",
};

export function getOS(): OsType {
  if (typeof navigator === "undefined") return "Other";

  const fromUAData = UA_DATA_MAP[navigator.userAgentData?.platform ?? ""];
  if (fromUAData) return fromUAData;

  const ua = navigator.userAgent;

  return UA_RULES.find(([regex]) => regex.test(ua))?.[1] ?? "Other";
}
