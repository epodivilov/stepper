export type Data = {
  countries?: string[];
  cities?: string[];
  selectedCountry?: string;
  selectedCity?: string;
  address?: string;
  comment?: string;
  result?: {
    ok: boolean;
    message: string;
  };
};
