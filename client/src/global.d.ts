interface NavigatorUAData {
  platform: string;
  mobile: boolean;
  brands: { brand: string; version: string }[];
  getHighEntropyValues(hints: string[]): Promise<Record<string, string>>;
}

interface Navigator {
  readonly userAgentData?: NavigatorUAData;
}
